const { User } = require('../database/models');
const objectError = require('../utils/objectError');
const {
  HTTP_NOT_FOUND_STATUS,
  HTTP_BAD_REEQUEST_STATUS,
  HTTP_CONFLICT_STATUS,
} = require('../utils/status-HTTP');

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });

  if (!user) throw objectError(HTTP_BAD_REEQUEST_STATUS, 'Invalid fields');

  return user;
};

const createUser = async (displayName, email, password, image) => {
  const verifyEmail = await User.findOne({ where: { email } });

  if (verifyEmail) throw objectError(HTTP_CONFLICT_STATUS, 'User already registered');

  const user = await User.create({ displayName, email, password, image });

  return user;
};

const getUsersAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

  if (!user) throw objectError(HTTP_NOT_FOUND_STATUS, 'User does not exist');

  return user;
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  loginUser,
  createUser,
  getUsersAll,
  getUserById,
  deleteUser,
};
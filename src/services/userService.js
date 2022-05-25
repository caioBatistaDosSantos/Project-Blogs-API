const { User } = require('../database/models');
const objectError = require('../utils/objectError');
const { HTTP_NOT_FOUND_STATUS } = require('../utils/status-HTTP');

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });

  return user;
};

const verifyEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const createUser = async (displayName, email, password, image) => {
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

module.exports = {
  loginUser,
  verifyEmail,
  createUser,
  getUsersAll,
  getUserById,
};
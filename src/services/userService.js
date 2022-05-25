const { User } = require('../database/models');

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
  console.log('chegou aqui')
  // const users = await User.findAll({ include: { attributes: { exclude: ['password'] } } });
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  console.log(users)

  return users;
};

module.exports = {
  loginUser,
  verifyEmail,
  createUser,
  getUsersAll,
};
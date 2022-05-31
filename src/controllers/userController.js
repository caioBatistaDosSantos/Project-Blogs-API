const userService = require('../services/userService');
const generateToken = require('../utils/generateJWT');
const {
  HTTP_BAD_REEQUEST_STATUS,
  HTTP_OK_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_NO_CONTENT_STATUS,
} = require('../utils/status-HTTP');

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(HTTP_BAD_REEQUEST_STATUS).json({
        message: 'Some required fields are missing',
      });
    }

    const User = await userService.loginUser(email, password);

    const { password: passDB, ...userWithoutPass } = User.dataValues;
    const token = generateToken(userWithoutPass);

    return res.status(HTTP_OK_STATUS).json({ token });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;

    const User = await userService.createUser(displayName, email, password, image);
    const { password: passDB, ...userWithoutPass } = User.dataValues;
    const token = generateToken(userWithoutPass);

    return res.status(HTTP_CREATED_STATUS).json({ token });
  } catch (error) {
    next(error);
  }
};

const getUsersAll = async (_req, res) => {
  const Users = await userService.getUsersAll();

  return res.status(HTTP_OK_STATUS).json(Users);
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const User = await userService.getUserById(id); 

    return res.status(HTTP_OK_STATUS).json(User);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res) => {
  const token = req.user;

  await userService.deleteUser(token.data.id);

  return res.status(HTTP_NO_CONTENT_STATUS).send();
};

module.exports = {
  loginUser,
  createUser,
  getUsersAll,
  getUserById,
  deleteUser,
};
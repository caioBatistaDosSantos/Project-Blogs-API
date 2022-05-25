const userService = require('../services/userService');
const generateToken = require('../utils/generateJWT');
const {
  HTTP_BAD_REEQUEST_STATUS,
  HTTP_OK_STATUS,
  HTTP_CONFLICT_STATUS,
  HTTP_CREATED_STATUS,
} = require('../utils/status-HTTP');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(HTTP_BAD_REEQUEST_STATUS).json({
      message: 'Some required fields are missing',
    });
  }

  const User = await userService.loginUser(email, password);

  if (!User) {
    return res.status(HTTP_BAD_REEQUEST_STATUS).json({
      message: 'Invalid fields',
    });
  }

  const { password: passDB, ...userWithoutPass } = User.dataValues;
  const token = generateToken(userWithoutPass);

  return res.status(HTTP_OK_STATUS).json({ token });
};

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const verifyEmail = await userService.verifyEmail(email);

  if (verifyEmail) {
    return res.status(HTTP_CONFLICT_STATUS).json({
      message: 'User already registered',
    });
  }

  const User = await userService.createUser(displayName, email, password, image);

  const { password: passDB, ...userWithoutPass } = User.dataValues;
  const token = generateToken(userWithoutPass);

  return res.status(HTTP_CREATED_STATUS).json({ token });
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

module.exports = {
  loginUser,
  createUser,
  getUsersAll,
  getUserById,
};
const loginService = require('../services/loginService');
const generateToken = require('../utils/generateJWT');
const { HTTP_BAD_REEQUEST_STATUS, HTTP_OK_STATUS } = require('../utils/status-HTTP');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(HTTP_BAD_REEQUEST_STATUS).json({
      message: 'Some required fields are missing',
    });
  }

  const User = await loginService.loginUser(email, password);

  if (!User) {
    return res.status(HTTP_BAD_REEQUEST_STATUS).json({
      message: 'Invalid fields',
    });
  }

  const { password: passDB, ...userWithoutPass } = User.dataValues;
  const token = generateToken(userWithoutPass);

  return res.status(HTTP_OK_STATUS).json({ token });
};

module.exports = {
  loginUser,
};
const categoryService = require('../services/categoryService');
const { HTTP_BAD_REEQUEST_STATUS, HTTP_CREATED_STATUS } = require('../utils/status-HTTP');

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(HTTP_BAD_REEQUEST_STATUS).json({ message: '"name" is required' });
    }

    const Category = await categoryService.createCategory(name);

    return res.status(HTTP_CREATED_STATUS).json(Category);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
};
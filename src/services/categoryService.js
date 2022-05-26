const { Category } = require('../database/models');
const objectError = require('../utils/objectError');
const { HTTP_CONFLICT_STATUS } = require('../utils/status-HTTP');

const createCategory = async (name) => {
  const verifyName = await Category.findOne({ where: { name } });

  if (verifyName) throw objectError(HTTP_CONFLICT_STATUS, 'Category already registered');

  const category = await Category.create({ name });

  return category;
};

const getCategoriesAll = async () => {
  const categories = await Category.findAll();

  return categories;
};

module.exports = {
  createCategory,
  getCategoriesAll,
};
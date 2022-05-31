const Sequelize = require('sequelize');
const config = require('../database/config/config');
const { BlogPost, PostCategory, User, Category } = require('../database/models');
const objectError = require('../utils/objectError');
const {
  HTTP_BAD_REEQUEST_STATUS,
  HTTP_NOT_FOUND_STATUS,
  HTTP_UNAUTHORIZED_STATUS,
} = require('../utils/status-HTTP');

const sequelize = new Sequelize(config.development);

const createPost = async (title, content, categoryIds, userId) => {
  try {
    return await sequelize.transaction(async (t) => {
      const blogPost = await BlogPost.create({
        title, content, userId, published: new Date(), updated: new Date(),
      }, { transaction: t });

      await PostCategory.bulkCreate(
        categoryIds.map((categoryId) => ({
          postId: blogPost.id, categoryId,
        })), { transaction: t },
      );

      return blogPost; 
    });
  } catch (error) {
    console.log(error);
    throw objectError(HTTP_BAD_REEQUEST_STATUS, 'invalid request');
  }
};

const getPost = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: { exclude: ['PostCategory'] } },
    ],
  });

  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: { exclude: ['PostCategory'] } },
    ],
  });

  if (!post) throw objectError(HTTP_NOT_FOUND_STATUS, 'Post does not exist');

  return post;
};

const updatePostById = async (id, tokenId, title, content) => {
  const post = await BlogPost.findByPk(id);

  if (!post) throw objectError(HTTP_NOT_FOUND_STATUS, 'Post does not exist');

  if (post.userId !== tokenId) throw objectError(HTTP_UNAUTHORIZED_STATUS, 'Unauthorized user');

  await BlogPost.update(
    { title, content },
    { where: { id } },
  );
};

module.exports = {
  createPost,
  getPost,
  getPostById,
  updatePostById,
};
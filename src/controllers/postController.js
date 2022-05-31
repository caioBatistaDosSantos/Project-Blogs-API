const postService = require('../services/postService');
const {
  HTTP_BAD_REEQUEST_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_OK_STATUS,
} = require('../utils/status-HTTP');

const createPost = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const token = req.user;

    if (!title || !content || !categoryIds) {
      return res.status(HTTP_BAD_REEQUEST_STATUS).json({
        message: 'Some required fields are missing',
      });
    }

    const newPost = await postService.createPost(title, content, categoryIds, token.data.id);

    return res.status(HTTP_CREATED_STATUS).json(newPost);
  } catch (error) {
    next(error);
  }
};

const getPost = async (_req, res) => {
  const posts = await postService.getPost();

  return res.status(HTTP_OK_STATUS).json(posts);
};

module.exports = {
  createPost,
  getPost,
};
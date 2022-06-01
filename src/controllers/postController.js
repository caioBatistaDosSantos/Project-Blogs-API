const postService = require('../services/postService');
const {
  HTTP_BAD_REEQUEST_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_OK_STATUS,
  HTTP_NO_CONTENT_STATUS,
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

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await postService.getPostById(id);

    return res.status(HTTP_OK_STATUS).json(post);
  } catch (error) {
    next(error);
  }
};

const updatePostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = req.user;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(HTTP_BAD_REEQUEST_STATUS).json({
        message: 'Some required fields are missing',
      });
    }

    await postService.updatePostById(
      id, token.data.id, title, content,
    );
    
    const updatedPost = await postService.getPostById(id);

    return res.status(HTTP_OK_STATUS).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

const deletePostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = req.user;

    await postService.deletePostById(id, token.data.id);

    return res.status(HTTP_NO_CONTENT_STATUS).send();
  } catch (error) {
    next(error);
  }
};

const getPostBySearch = async (req, res) => {
  const { q } = req.query;

  const posts = await postService.getPostBySearch(q);

  return res.status(HTTP_OK_STATUS).json(posts);
};

module.exports = {
  createPost,
  getPost,
  getPostById,
  updatePostById,
  deletePostById,
  getPostBySearch,
};
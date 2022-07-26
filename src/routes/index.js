const express = require('express');
const validateUser = require('../middlewares/validateUser');
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');
const postController = require('../controllers/postController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.get('/user', validateToken, userController.getUsersAll);
router.get('/user/:id', validateToken, userController.getUserById);
router.get('/categories', validateToken, categoryController.getCategoriesAll);
router.get('/post', validateToken, postController.getPost);
router.get('/post/search', validateToken, postController.getPostBySearch);
router.get('/post/:id', validateToken, postController.getPostById);

router.post('/login', userController.loginUser);
router.post('/user', validateUser, userController.createUser);
router.post('/categories', validateToken, categoryController.createCategory);
router.post('/post', validateToken, postController.createPost);

router.put('/post/:id', validateToken, postController.updatePostById);

router.delete('/post/:id', validateToken, postController.deletePostById);
router.delete('/user/me', validateToken, userController.deleteUser);

module.exports = router;
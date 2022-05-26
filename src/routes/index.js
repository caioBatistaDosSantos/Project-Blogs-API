const express = require('express');
const validateUser = require('../middlewares/validateUser');
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.get('/user', validateToken, userController.getUsersAll);
router.get('/user/:id', validateToken, userController.getUserById);
router.get('/categories', validateToken, categoryController.getCategoriesAll);

router.post('/login', userController.loginUser);
router.post('/user', validateUser, userController.createUser);
router.post('/categories', validateToken, categoryController.createCategory);

module.exports = router;
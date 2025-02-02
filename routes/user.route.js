const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware'); 
const { route } = require('./index.route');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/logout', userController.logout);
router.get('/profile', authMiddleware.isAuthenticated, userController.getProfile);
module.exports = router;

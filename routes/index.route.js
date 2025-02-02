const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index.controller'); // Correct path to the controller

// Attach the controller's index function to the route
router.get('/', indexController.index);

module.exports = router;

const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Get leaderboard
router.get('/leaderboard', userController.getLeaderboard);

// Get user profile
router.get('/:id', userController.getUserProfile);

module.exports = router;
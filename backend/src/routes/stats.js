const express = require('express');
const statsController = require('../controllers/statsController');
const router = express.Router();

// Get platform statistics
router.get('/', statsController.getPlatformStats);

// Get problem difficulty distribution
router.get('/problems', statsController.getProblemStats);

module.exports = router;
const express = require('express');
const trackController = require('../controllers/trackController');
const router = express.Router();

// Get all learning tracks
router.get('/', trackController.getAllTracks);

module.exports = router;
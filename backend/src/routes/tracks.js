const express = require('express');
const trackController = require('../controllers/trackController');
const router = express.Router();


router.get('/', trackController.getAllTracks);

module.exports = router;
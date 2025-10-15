const express = require('express');
const statsController = require('../controllers/statsController');
const router = express.Router();


router.get('/', statsController.getPlatformStats);


router.get('/problems', statsController.getProblemStats);

module.exports = router;
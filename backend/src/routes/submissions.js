const express = require('express');
const submissionController = require('../controllers/submissionController');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();


router.post('/', submissionController.submitCode);
router.get('/my', requireAuth, submissionController.getUserSubmissions);

module.exports = router;
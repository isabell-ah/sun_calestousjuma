const express = require('express');
const submissionController = require('../controllers/submissionController');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

// Submit code
router.post('/', submissionController.submitCode);

// Get user submissions
router.get('/my', requireAuth, submissionController.getUserSubmissions);

module.exports = router;
const express = require('express');
const problemController = require('../controllers/problemController');
const router = express.Router();

// Get all problems with optional search
router.get('/', problemController.getAllProblems);

// Get random problem
router.get('/random', problemController.getRandomProblem);

// Get single problem
router.get('/:id', problemController.getProblemById);

module.exports = router;
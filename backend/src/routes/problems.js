const express = require('express');
const problemController = require('../controllers/problemController');
const router = express.Router();

router.get('/', problemController.getAllProblems);

router.get('/random', problemController.getRandomProblem);
router.get('/:id', problemController.getProblemById);

module.exports = router;
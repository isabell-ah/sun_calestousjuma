const leetcodeService = require('../services/leetcodeService');

class ProblemController {
  // Get all problems with filtering and pagination
  async getAllProblems(req, res) {
    try {
      const { search, difficulty, category, page = 1, limit = 50 } = req.query;

      // Get problems from LeetCode service (fallback problems)
      let allProblems = await leetcodeService.fetchProblems();

      // Apply filters
      if (search) {
        const searchLower = search.toLowerCase();
        allProblems = allProblems.filter(problem =>
          problem.title.toLowerCase().includes(searchLower) ||
          problem.description.toLowerCase().includes(searchLower)
        );
      }

      if (difficulty) {
        allProblems = allProblems.filter(problem =>
          problem.difficulty.toLowerCase() === difficulty.toLowerCase()
        );
      }

      if (category) {
        allProblems = allProblems.filter(problem =>
          problem.category.toLowerCase() === category.toLowerCase()
        );
      }

      // Apply pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const total = allProblems.length;
      const paginatedProblems = allProblems.slice(skip, skip + parseInt(limit));

      res.json({
        problems: paginatedProblems,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: total,
          totalPages: Math.ceil(total / parseInt(limit))
        }
      });
    } catch (error) {
      console.error('Get problems error:', error);
      
      // Return empty result instead of 500 error
      res.json({
        problems: [],
        pagination: {
          page: parseInt(req.query.page || 1),
          limit: parseInt(req.query.limit || 50),
          total: 0,
          pages: 0
        }
      });
    }
  }

  // Get random problem
  async getRandomProblem(req, res) {
    try {
      const { difficulty } = req.query;

      // Get problems from LeetCode service
      let allProblems = await leetcodeService.fetchProblems();

      // Filter by difficulty if specified
      if (difficulty) {
        allProblems = allProblems.filter(problem =>
          problem.difficulty.toLowerCase() === difficulty.toLowerCase()
        );
      }

      if (allProblems.length === 0) {
        return res.status(404).json({ error: 'No problems found' });
      }

      // Get random problem
      const randomIndex = Math.floor(Math.random() * allProblems.length);
      const problem = allProblems[randomIndex];

      res.json(problem);
    } catch (error) {
      console.error('Get random problem error:', error);
      res.json({ error: 'No random problem available right now' });
    }
  }

  // Get single problem by ID
  async getProblemById(req, res) {
    try {
      // Get problems from LeetCode service
      const allProblems = await leetcodeService.fetchProblems();
      const problem = allProblems.find(p => p.id === req.params.id);

      if (!problem) {
        return res.status(404).json({ error: 'Problem not found' });
      }

      res.json(problem);
    } catch (error) {
      console.error('Get problem by ID error:', error);
      res.status(404).json({ error: 'Problem not found' });
    }
  }


}

module.exports = new ProblemController();
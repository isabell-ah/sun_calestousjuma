const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class StatsController {
  // Get platform statistics
  async getPlatformStats(req, res) {
    try {
      const leetcodeService = require('../services/leetcodeService');
      
      const [totalUsers, totalSubmissions, recentSubmissions, problems] = await Promise.all([
        prisma.user.count(),
        prisma.submission.count(),
        prisma.submission.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000) 
            }
          }
        }),
        leetcodeService.fetchProblems() 
      ]);

  
      const stats = {
        totalUsers: Math.max(1, totalUsers), 
        totalProblems: problems.length, 
        totalSubmissions,
        recentSubmissions,
        timestamp: new Date().toISOString()
      };

      res.json(stats);
    } catch (error) {
      console.error('Get platform stats error:', error);
      res.status(500).json({ error: 'Failed to fetch statistics' });
    }
  }

  // Get problem difficulty distribution
  async getProblemStats(req, res) {
    try {
      const distribution = await prisma.problem.groupBy({
        by: ['difficulty'],
        _count: {
          difficulty: true
        }
      });

      const result = distribution.reduce((acc, item) => {
        acc[item.difficulty] = item._count.difficulty;
        return acc;
      }, {});

      res.json(result);
    } catch (error) {
      console.error('Get problem stats error:', error);
      res.status(500).json({ error: 'Failed to fetch problem statistics' });
    }
  }
}

module.exports = new StatsController();
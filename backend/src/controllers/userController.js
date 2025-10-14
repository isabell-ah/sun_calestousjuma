const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserController {
  // Get leaderboard - only show unique users
  async getLeaderboard(req, res) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          xp: true,
          level: true,
          streak: true
        },
        orderBy: { xp: 'desc' },
        take: 10
      });
      
      // Remove duplicates by email for CJLF Resource Center
      const uniqueUsers = users.filter((user, index, self) => 
        index === self.findIndex(u => u.email === user.email)
      );
      
      const leaderboard = uniqueUsers.slice(0, 5).map((user, index) => ({
        ...user,
        rank: index + 1,
        score: Math.floor(user.xp / 154)
      }));
      
      res.json(leaderboard);
    } catch (error) {
      console.error('Get leaderboard error:', error);
      res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  }

  // Get user profile by ID
  async getUserProfile(req, res) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.params.id },
        select: {
          id: true,
          name: true,
          avatar: true,
          xp: true,
          level: true,
          streak: true,
          createdAt: true
        }
      });
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      console.error('Get user profile error:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }
}

module.exports = new UserController();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AuthController {
  // Get current authenticated user
  async getCurrentUser(req, res) {
    try {
      if (req.user) {
        res.json({ user: req.user });
      } else {
        res.status(401).json({ error: 'Not authenticated' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to get user' });
    }
  }

  // Create demo user for testing
  async createDemoUser(req, res) {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    try {
      let demoUser = await prisma.user.findFirst({
        where: { email: email }
      });

      if (!demoUser) {
        demoUser = await prisma.user.create({
          data: {
            email: email,
            name: name,
            googleId: 'demo-' + Date.now(),
            xp: 0,
            level: 1,
            streak: 0
          }
        });
      }

      req.session.userId = demoUser.id;
      req.user = demoUser;
      res.json({ user: demoUser });
    } catch (error) {
      console.error('Demo user creation failed:', error);
      res.status(500).json({ error: 'Failed to create demo user' });
    }
  }

  // Handle Google OAuth callback
  handleGoogleCallback(req, res) {
    // Redirect to dashboard after successful Google auth
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:1313'}/dashboard?auth=success`);
  }

  // Logout user
  async logout(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
      }
      
      req.logout((err) => {
        if (err) {
          return res.status(500).json({ error: 'Logout failed' });
        }
        req.session.destroy((err) => {
          if (err) {
            return res.status(500).json({ error: 'Session cleanup failed' });
          }
          res.clearCookie('connect.sid');
          res.json({ message: 'Logged out successfully' });
        });
      });
    } catch (error) {
      res.status(500).json({ error: 'Logout failed' });
    }
  }
}

module.exports = new AuthController();
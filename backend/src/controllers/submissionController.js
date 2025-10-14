const { PrismaClient } = require('@prisma/client');
const codeExecutionService = require('../services/codeExecutionService');
const testCaseService = require('../services/testCaseService');
const prisma = new PrismaClient();

class SubmissionController {
  // Submit code for a problem
  async submitCode(req, res) {
    const { problemId, code, language } = req.body;

    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required. Please log in to track your progress.',
        loginUrl: '/api/auth/google'
      });
    }

    const userId = req.user.id;

    try {
      // Create submission record
      const submission = await prisma.submission.create({
        data: {
          userId,
          problemId,
          code,
          language,
          status: 'pending'
        }
      });

      // Execute code with test cases
      const testResult = await codeExecutionService.executeWithTestCases(code, language, problemId);
      const status = testResult.passed ? 'accepted' : 'wrong_answer';

      // Update submission with results
      const updatedSubmission = await prisma.submission.update({
        where: { id: submission.id },
        data: { 
          status, 
          score: testResult.score, 
          runtime: testResult.runtime 
        }
      });

      updatedSubmission.testResults = testResult;

      // Update user stats if accepted
      if (status === 'accepted') {
        const updatedUser = await this._updateUserStats(userId, problemId);
        updatedSubmission.user = updatedUser;
      }

      res.json(updatedSubmission);
    } catch (error) {
      console.error('Submission error:', error);
      res.status(500).json({ error: 'Failed to submit code' });
    }
  }

  // Get user's submissions
  async getUserSubmissions(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const submissions = await prisma.submission.findMany({
        where: { userId: req.user.id },
        include: { problem: true },
        orderBy: { createdAt: 'desc' }
      });

      res.json(submissions);
    } catch (error) {
      console.error('Get submissions error:', error);
      res.status(500).json({ error: 'Failed to fetch submissions' });
    }
  }

  // Private helper method to update user stats
  async _updateUserStats(userId, problemId) {
    const currentUser = await prisma.user.findUnique({ where: { id: userId } });
    
    // Check if user already solved this problem
    const existingSolution = await prisma.submission.findFirst({
      where: { userId, problemId, status: 'accepted' }
    });
    
    // Only give XP for first-time solutions
    const xpGain = existingSolution ? 0 : 50;
    const newXP = currentUser.xp + xpGain;
    const newLevel = Math.floor(newXP / 100) + 1;
    
    // Update streak only if solved today
    const today = new Date().toDateString();
    const lastActive = currentUser.lastActive ? new Date(currentUser.lastActive).toDateString() : null;
    const streakIncrement = lastActive === today ? 0 : 1;

    return await prisma.user.update({
      where: { id: userId },
      data: {
        xp: newXP,
        level: newLevel,
        streak: lastActive === today ? currentUser.streak : currentUser.streak + streakIncrement,
        lastActive: new Date()
      }
    });
  }
}

module.exports = new SubmissionController();
const { PrismaClient } = require('@prisma/client');
const leetcodeService = require('../services/leetcodeService');
const prisma = new PrismaClient();

class TrackController {
  // Get all learning tracks
  async getAllTracks(req, res) {
    try {
      const tracks = [
        {
          id: "beginner",
          title: "Programming Fundamentals",
          description: "Start your coding journey with the basics",
          difficulty: "Beginner",
          estimatedTime: "4-6 weeks",
          progress: 0,
          problems: [],
          modules: [
            { id: 1, title: "Variables and Data Types", completed: false, locked: false },
            { id: 2, title: "Control Flow (if/else)", completed: false, locked: false },
            { id: 3, title: "Loops (for/while)", completed: false, locked: false },
            { id: 4, title: "Functions and Parameters", completed: false, locked: true },
            { id: 5, title: "Arrays and Objects", completed: false, locked: true },
            { id: 6, title: "Error Handling", completed: false, locked: true }
          ]
        },
        {
          id: "intermediate",
          title: "Data Structures & Algorithms",
          description: "Master essential programming concepts",
          difficulty: "Intermediate",
          estimatedTime: "6-8 weeks",
          progress: 0,
          problems: [],
          modules: [
            { id: 1, title: "Arrays and Strings", completed: false, locked: false },
            { id: 2, title: "Linked Lists", completed: false, locked: true },
            { id: 3, title: "Stacks and Queues", completed: false, locked: true },
            { id: 4, title: "Trees and Graphs", completed: false, locked: true },
            { id: 5, title: "Sorting Algorithms", completed: false, locked: true },
            { id: 6, title: "Dynamic Programming", completed: false, locked: true }
          ]
        },
        {
          id: "advanced",
          title: "System Design & Architecture",
          description: "Advanced topics for senior developers",
          difficulty: "Advanced",
          estimatedTime: "8-12 weeks",
          progress: 0,
          problems: [],
          modules: [
            { id: 1, title: "System Design Principles", completed: false, locked: false },
            { id: 2, title: "Database Design", completed: false, locked: true },
            { id: 3, title: "Scalability Patterns", completed: false, locked: true },
            { id: 4, title: "Microservices", completed: false, locked: true },
            { id: 5, title: "Performance Optimization", completed: false, locked: true },
            { id: 6, title: "Security Best Practices", completed: false, locked: true }
          ]
        },
        {
          id: "web-dev",
          title: "Web Development",
          description: "Frontend and backend web technologies",
          difficulty: "Intermediate",
          estimatedTime: "6-10 weeks",
          progress: 0,
          problems: [],
          modules: [
            { id: 1, title: "HTML & CSS Fundamentals", completed: false, locked: false },
            { id: 2, title: "JavaScript DOM Manipulation", completed: false, locked: true },
            { id: 3, title: "React/Vue Frameworks", completed: false, locked: true },
            { id: 4, title: "Backend APIs", completed: false, locked: true },
            { id: 5, title: "Database Integration", completed: false, locked: true },
            { id: 6, title: "Deployment & DevOps", completed: false, locked: true }
          ]
        },
        {
          id: "mobile-dev",
          title: "Mobile Development",
          description: "iOS and Android app development",
          difficulty: "Advanced",
          estimatedTime: "10-14 weeks",
          progress: 0,
          problems: [],
          modules: [
            { id: 1, title: "Mobile UI/UX Principles", completed: false, locked: false },
            { id: 2, title: "React Native/Flutter", completed: false, locked: true },
            { id: 3, title: "Native APIs", completed: false, locked: true },
            { id: 4, title: "App Store Deployment", completed: false, locked: true },
            { id: 5, title: "Performance Optimization", completed: false, locked: true },
            { id: 6, title: "Testing & Analytics", completed: false, locked: true }
          ]
        },
        {
          id: "machine-learning",
          title: "Machine Learning",
          description: "AI and ML fundamentals",
          difficulty: "Advanced",
          estimatedTime: "12-16 weeks",
          progress: 0,
          problems: [],
          modules: [
            { id: 1, title: "Statistics & Probability", completed: false, locked: false },
            { id: 2, title: "Linear Algebra", completed: false, locked: true },
            { id: 3, title: "Supervised Learning", completed: false, locked: true },
            { id: 4, title: "Neural Networks", completed: false, locked: true },
            { id: 5, title: "Deep Learning", completed: false, locked: true },
            { id: 6, title: "Model Deployment", completed: false, locked: true }
          ]
        }
      ];

      res.json(tracks);
    } catch (error) {
      console.error('Get tracks error:', error);
      res.status(500).json({ error: 'Failed to fetch tracks' });
    }
  }





  // Private method to update user progress
  async _updateUserProgress(tracks, userId) {
    try {
      const userProgress = await prisma.submission.findMany({
        where: { userId: userId, status: 'accepted' },
        include: { problem: true }
      });

      const solvedCount = userProgress.length;
      
      // Update progress based on solved problems
      tracks.forEach(track => {
        if (track.id === 'beginner' && solvedCount >= 1) {
          track.progress = Math.min(100, (solvedCount / 6) * 100);
          track.modules.forEach((module, idx) => {
            if (idx < solvedCount) {
              module.completed = true;
              if (idx < track.modules.length - 1) {
                track.modules[idx + 1].locked = false;
              }
            }
          });
        }
      });
    } catch (error) {
      console.error('Error updating user progress:', error);
      // Continue without progress updates
    }
  }
}

module.exports = new TrackController();
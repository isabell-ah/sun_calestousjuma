const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const router = express.Router();

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  authController.handleGoogleCallback
);

// Get current user
router.get('/me', authController.getCurrentUser);

// Create demo user for testing
router.post('/demo', authController.createDemoUser);

// Logout
router.post('/logout', authController.logout);

module.exports = router;
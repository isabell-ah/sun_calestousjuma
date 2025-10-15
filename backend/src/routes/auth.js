const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const router = express.Router();


router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  authController.handleGoogleCallback
);

router.get('/me', authController.getCurrentUser);

router.post('/demo', authController.createDemoUser);

router.post('/logout', authController.logout);

module.exports = router;
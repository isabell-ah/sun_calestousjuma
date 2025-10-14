// Authentication middleware
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      error: 'Authentication required',
      loginUrl: '/api/auth/google'
    });
  }
  next();
};

// Optional authentication middleware
const optionalAuth = (req, res, next) => {
  // Continue regardless of authentication status
  next();
};

module.exports = {
  requireAuth,
  optionalAuth
};
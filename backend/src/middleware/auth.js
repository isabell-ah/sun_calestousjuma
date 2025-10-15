
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      error: 'Authentication required',
      loginUrl: '/api/auth/google'
    });
  }
  next();
};


const optionalAuth = (req, res, next) => {

  next();
};

module.exports = {
  requireAuth,
  optionalAuth
};
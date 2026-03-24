// Re-export from centralized security middleware
const { authMiddleware, optionalAuth, requireRole } = require('./security');
module.exports = { authMiddleware, authenticateToken: authMiddleware, optionalAuth, requireRole };

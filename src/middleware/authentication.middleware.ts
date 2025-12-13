import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Extend Express Request interface to include currentUser
declare global {
  namespace Express {
    interface Request {
      currentUser?: string;
    }
  }
}

// Routes that don't require authentication
const publicRoutes = [
  '/api/auth/login',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/users', // POST for registration
  '/health'
];

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if route is public
    const isPublicRoute = publicRoutes.some(route => {
      if (req.path === route) {
        // Allow POST to /api/users for registration
        if (route === '/api/users' && req.method === 'POST') {
          return true;
        }
        // Allow all methods for other public routes
        if (route !== '/api/users') {
          return true;
        }
      }
      return false;
    });

    if (isPublicRoute) {
      return next();
    }

    // Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Authorization header is missing'
      });
    }

    // Check if it's a Bearer token
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authorization format. Use: Bearer <token>'
      });
    }

    // Extract token
    const token = authHeader.slice(7);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token is missing'
      });
    }

    // Verify and decode token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Assign decoded token as string to currentUser header
    req.currentUser = JSON.stringify(decoded);

    // Also set it in headers for downstream use
    req.headers['currentuser'] = JSON.stringify(decoded);

    next();
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired'
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || 'Authentication failed'
    });
  }
};


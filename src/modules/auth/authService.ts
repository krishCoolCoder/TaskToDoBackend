import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { authRepository } from './authRepository';
import { IUser } from '../../models/user';
import { userProjectMappingRepository } from '../userProjectMapping/userProjectMappingRepository';
import { userRoleMappingRepository } from '../userRoleMapping/userRoleMappingRepository';
import { userDesignationMappingRepository } from '../userDesignationMapping/userDesignationMappingRepository';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const PASSWORD_SECRET = process.env.PASSWORD_SECRET || 'password-encryption-secret-key';

// Hash password using SHA256 with secret
function hashPassword(password: string): string {
  return CryptoJS.HmacSHA256(password, PASSWORD_SECRET).toString();
}

// Store invalidated tokens (in production, use Redis or database)
const invalidatedTokens: Set<string> = new Set();

export class AuthService {
  generateToken(user: IUser): string {
    const payload = {
      userId: user._id,
      email: user.email,
      firstName: user.firstName
    };
    
    // Token without expiration
    return jwt.sign(payload, JWT_SECRET);
  }

  verifyToken(token: string): { valid: boolean; decoded?: any; message: string } {
    try {
      if (invalidatedTokens.has(token)) {
        return { valid: false, message: 'Token has been invalidated' };
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      return { valid: true, decoded, message: 'Token is valid' };
    } catch (error: any) {
      return { valid: false, message: error.message || 'Invalid token' };
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean; data?: any; message: string }> {
    try {
      if (!email || !password) {
        return { success: false, message: 'Email and password are required' };
      }

      const user = await authRepository.findByEmail(email);
      
      if (!user) {
        return { success: false, message: 'Invalid email or password' };
      }

      // Check if user is blocked
      if (user.userStatus === 'blocked') {
        return { success: false, message: 'Your account has been blocked. Please contact support.' };
      }

      // Check if user is inactive
      if (user.userStatus === 'inactive') {
        return { success: false, message: 'Your account is inactive. Please contact support.' };
      }

      // Compare hashed password
      const hashedInputPassword = hashPassword(password);
      if (hashedInputPassword !== user.password) {
        return { success: false, message: 'Invalid email or password' };
      }

      const token = this.generateToken(user);

      // Fetch user's mapped projects
      const userProjects = await userProjectMappingRepository.findByUserId(user._id.toString());
      const projects = userProjects.map((mapping: any) => mapping.projectRefId);

      // Fetch user's mapped roles
      const userRoles = await userRoleMappingRepository.findByUserId(user._id.toString());
      const roles = userRoles.map((mapping: any) => mapping.roleRefId);

      // Fetch user's mapped designations
      const userDesignations = await userDesignationMappingRepository.findByUserId(user._id.toString());
      const designations = userDesignations.map((mapping: any) => mapping.designationId);

      // Remove password from response
      const userResponse = {
        _id: user._id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        userStatus: user.userStatus
      };

      return {
        success: true,
        data: { 
          user: userResponse, 
          token,
          projects,
          roles,
          designations
        },
        message: 'Login successful'
      };
    } catch (error: any) {
      return { success: false, message: error.message || 'Login failed' };
    }
  }

  async forgotPassword(email: string): Promise<{ success: boolean; message: string; resetToken?: string }> {
    try {
      if (!email) {
        return { success: false, message: 'Email is required' };
      }

      const user = await authRepository.findByEmail(email);
      
      if (!user) {
        // Don't reveal if email exists or not for security
        return { success: true, message: 'If the email exists, a password reset link has been sent' };
      }

      // Generate a reset token (in production, store this with expiration)
      const resetToken = jwt.sign(
        { userId: user._id, purpose: 'password-reset' },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      // In production, send email with reset link
      // For now, return the token in response (for testing purposes)
      return {
        success: true,
        message: 'Password reset token generated. In production, this would be sent via email.',
        resetToken
      };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to process forgot password request' };
    }
  }

  async resetPassword(resetToken: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      if (!resetToken || !newPassword) {
        return { success: false, message: 'Reset token and new password are required' };
      }

      const decoded = jwt.verify(resetToken, JWT_SECRET) as { userId: string; purpose: string };
      
      if (decoded.purpose !== 'password-reset') {
        return { success: false, message: 'Invalid reset token' };
      }

      // Hash the new password before saving
      const hashedPassword = hashPassword(newPassword);
      await authRepository.updatePassword(decoded.userId, hashedPassword);

      return { success: true, message: 'Password reset successful' };
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        return { success: false, message: 'Reset token has expired' };
      }
      return { success: false, message: error.message || 'Failed to reset password' };
    }
  }

  logout(token: string): { success: boolean; message: string } {
    try {
      if (!token) {
        return { success: false, message: 'Token is required' };
      }

      // Add token to invalidated list
      invalidatedTokens.add(token);

      return { success: true, message: 'Logout successful' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Logout failed' };
    }
  }
}

export const authService = new AuthService();


import { userRepository } from './userRepository';
import { IUser } from '../../models/user';
import mongoose from 'mongoose';

export class UserService {
  async createUser(userData: Partial<IUser>, createdById?: string): Promise<{ success: boolean; data?: IUser; message: string }> {
    try {
      // Check if email already exists
      const existingEmail = await userRepository.findByEmail(userData.email!);
      if (existingEmail) {
        return { success: false, message: 'Email already exists' };
      }

      // Check if mobile number already exists
      const existingMobile = await userRepository.findByMobileNumber(userData.mobileNumber!);
      if (existingMobile) {
        return { success: false, message: 'Mobile number already exists' };
      }

      const userDataWithCreator: Partial<IUser> = {
        ...userData,
        ...(createdById && mongoose.Types.ObjectId.isValid(createdById) 
          ? { createdBy: new mongoose.Types.ObjectId(createdById) } 
          : {})
      };

      const user = await userRepository.create(userDataWithCreator);
      
      // Remove password from response
      const userResponse = user.toObject();
      delete (userResponse as any).password;

      return { success: true, data: userResponse as IUser, message: 'User created successfully' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to create user' };
    }
  }

  async getUserById(id: string): Promise<{ success: boolean; data?: IUser; message: string }> {
    try {
      const user = await userRepository.findById(id);
      if (!user) {
        return { success: false, message: 'User not found' };
      }
      return { success: true, data: user, message: 'User retrieved successfully' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to retrieve user' };
    }
  }

  async getAllUsers(): Promise<{ success: boolean; data?: IUser[]; message: string }> {
    try {
      const users = await userRepository.findAll();
      return { success: true, data: users, message: 'Users retrieved successfully' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to retrieve users' };
    }
  }

  async updateUser(id: string, updateData: Partial<IUser>): Promise<{ success: boolean; data?: IUser; message: string }> {
    try {
      // Check if user exists
      const existingUser = await userRepository.findById(id);
      if (!existingUser) {
        return { success: false, message: 'User not found' };
      }

      // If email is being updated, check for duplicates
      if (updateData.email && updateData.email !== existingUser.email) {
        const emailExists = await userRepository.findByEmail(updateData.email);
        if (emailExists) {
          return { success: false, message: 'Email already exists' };
        }
      }

      // If mobile is being updated, check for duplicates
      if (updateData.mobileNumber && updateData.mobileNumber !== existingUser.mobileNumber) {
        const mobileExists = await userRepository.findByMobileNumber(updateData.mobileNumber);
        if (mobileExists) {
          return { success: false, message: 'Mobile number already exists' };
        }
      }

      const updatedUser = await userRepository.update(id, updateData);
      return { success: true, data: updatedUser!, message: 'User updated successfully' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to update user' };
    }
  }

  async deleteUser(id: string): Promise<{ success: boolean; data?: IUser; message: string }> {
    try {
      const user = await userRepository.delete(id);
      if (!user) {
        return { success: false, message: 'User not found' };
      }
      return { success: true, data: user, message: 'User deleted successfully' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to delete user' };
    }
  }
}

export const userService = new UserService();


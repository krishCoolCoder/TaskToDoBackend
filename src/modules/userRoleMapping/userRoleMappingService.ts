import { userRoleMappingRepository } from './userRoleMappingRepository';
import { IUserRoleMapping } from '../../models/userRoleMapping';
import { userRepository } from '../user/userRepository';
import { roleMasterRepository } from '../roleMaster/roleMasterRepository';
import mongoose from 'mongoose';

export class UserRoleMappingService {
  async createMapping(data: { roleRefId: string; userRefId: string }, createdById?: string) {
    try {
      // Validate if user exists
      const user = await userRepository.findById(data.userRefId);
      if (!user) {
        return { success: false, message: 'User not found' };
      }

      // Validate if role exists
      const role = await roleMasterRepository.findById(data.roleRefId);
      if (!role) {
        return { success: false, message: 'Role not found' };
      }

      const mappingData: Partial<IUserRoleMapping> = {
        roleRefId: new mongoose.Types.ObjectId(data.roleRefId),
        userRefId: new mongoose.Types.ObjectId(data.userRefId),
        createdAt: new Date()
      };

      if (createdById) {
        mappingData.createdBy = new mongoose.Types.ObjectId(createdById);
      }

      const mapping = await userRoleMappingRepository.create(mappingData);
      const populatedMapping = await userRoleMappingRepository.findById(mapping._id.toString());
      
      return { success: true, data: populatedMapping };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getMappingById(id: string) {
    try {
      const mapping = await userRoleMappingRepository.findById(id);
      if (!mapping) {
        return { success: false, message: 'User role mapping not found' };
      }
      return { success: true, data: mapping };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getMappingsByUserId(userRefId: string) {
    try {
      const mappings = await userRoleMappingRepository.findByUserId(userRefId);
      return { success: true, data: mappings };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getMappingsByRoleId(roleRefId: string) {
    try {
      const mappings = await userRoleMappingRepository.findByRoleId(roleRefId);
      return { success: true, data: mappings };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getAllMappings() {
    try {
      const mappings = await userRoleMappingRepository.findAll();
      return { success: true, data: mappings };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async updateMapping(id: string, updateData: { roleRefId?: string; userRefId?: string }, updatedById?: string) {
    try {
      const existingMapping = await userRoleMappingRepository.findById(id);
      if (!existingMapping) {
        return { success: false, message: 'User role mapping not found' };
      }

      // Validate if new user exists
      if (updateData.userRefId) {
        const user = await userRepository.findById(updateData.userRefId);
        if (!user) {
          return { success: false, message: 'User not found' };
        }
      }

      // Validate if new role exists
      if (updateData.roleRefId) {
        const role = await roleMasterRepository.findById(updateData.roleRefId);
        if (!role) {
          return { success: false, message: 'Role not found' };
        }
      }

      const dataToUpdate: Partial<IUserRoleMapping> = {};

      if (updateData.roleRefId) {
        dataToUpdate.roleRefId = new mongoose.Types.ObjectId(updateData.roleRefId);
      }

      if (updateData.userRefId) {
        dataToUpdate.userRefId = new mongoose.Types.ObjectId(updateData.userRefId);
      }

      if (updatedById) {
        dataToUpdate.updatedBy = new mongoose.Types.ObjectId(updatedById);
      }

      const updatedMapping = await userRoleMappingRepository.update(id, dataToUpdate);
      return { success: true, data: updatedMapping };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async deleteMapping(id: string) {
    try {
      const mapping = await userRoleMappingRepository.delete(id);
      if (!mapping) {
        return { success: false, message: 'User role mapping not found' };
      }
      return { success: true, message: 'User role mapping deleted successfully' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
}

export const userRoleMappingService = new UserRoleMappingService();



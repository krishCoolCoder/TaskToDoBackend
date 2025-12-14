import { roleMasterRepository } from './roleMasterRepository';
import { IRoleMaster } from '../../models/roleMaster';
import mongoose from 'mongoose';

export class RoleMasterService {
  async createRole(data: Partial<IRoleMaster>, createdById?: string) {
    try {
      // Check if role with same name already exists
      const existingRole = await roleMasterRepository.findByName(data.userRoleName!);
      if (existingRole) {
        return { success: false, message: 'Role with this name already exists' };
      }

      const roleData: Partial<IRoleMaster> = {
        ...data,
        createdAt: new Date()
      };

      if (createdById) {
        roleData.createdBy = new mongoose.Types.ObjectId(createdById);
      }

      const role = await roleMasterRepository.create(roleData);
      return { success: true, data: role };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getRoleById(id: string) {
    try {
      const role = await roleMasterRepository.findById(id);
      if (!role) {
        return { success: false, message: 'Role not found' };
      }
      return { success: true, data: role };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getAllRoles() {
    try {
      const roles = await roleMasterRepository.findAll();
      return { success: true, data: roles };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async updateRole(id: string, updateData: Partial<IRoleMaster>, updatedById?: string) {
    try {
      const existingRole = await roleMasterRepository.findById(id);
      if (!existingRole) {
        return { success: false, message: 'Role not found' };
      }

      // Check if new name conflicts with another role
      if (updateData.userRoleName) {
        const duplicateRole = await roleMasterRepository.findByName(updateData.userRoleName);
        if (duplicateRole && duplicateRole._id?.toString() !== id) {
          return { success: false, message: 'Role with this name already exists' };
        }
      }

      if (updatedById) {
        updateData.updatedBy = new mongoose.Types.ObjectId(updatedById);
      }

      const updatedRole = await roleMasterRepository.update(id, updateData);
      return { success: true, data: updatedRole };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async deleteRole(id: string) {
    try {
      const role = await roleMasterRepository.delete(id);
      if (!role) {
        return { success: false, message: 'Role not found' };
      }
      return { success: true, message: 'Role deleted successfully' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
}

export const roleMasterService = new RoleMasterService();


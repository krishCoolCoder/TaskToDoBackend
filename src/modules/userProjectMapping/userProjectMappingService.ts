import { userProjectMappingRepository } from './userProjectMappingRepository';
import { IUserProjectMapping } from '../../models/userProjectMapping';
import { userRepository } from '../user/userRepository';
import { projectRepository } from '../project/projectRepository';
import mongoose from 'mongoose';

export class UserProjectMappingService {
  async createMapping(data: { userRefId: string; projectRefId: string }, createdById?: string) {
    try {
      // Validate if user exists
      const user = await userRepository.findById(data.userRefId);
      if (!user) {
        return { success: false, message: 'User not found' };
      }

      // Validate if project exists
      const project = await projectRepository.findById(data.projectRefId);
      if (!project) {
        return { success: false, message: 'Project not found' };
      }

      // Check if user already exists on that project
      const existingMapping = await userProjectMappingRepository.findByUserAndProject(
        data.userRefId,
        data.projectRefId
      );
      if (existingMapping) {
        return { success: false, message: 'User already exists on this project' };
      }

      const mappingData: Partial<IUserProjectMapping> = {
        userRefId: new mongoose.Types.ObjectId(data.userRefId),
        projectRefId: new mongoose.Types.ObjectId(data.projectRefId),
        createdAt: new Date()
      };

      if (createdById) {
        mappingData.createdBy = new mongoose.Types.ObjectId(createdById);
      }

      const mapping = await userProjectMappingRepository.create(mappingData);
      const populatedMapping = await userProjectMappingRepository.findById(mapping._id.toString());
      
      return { success: true, data: populatedMapping };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getMappingById(id: string) {
    try {
      const mapping = await userProjectMappingRepository.findById(id);
      if (!mapping) {
        return { success: false, message: 'User project mapping not found' };
      }
      return { success: true, data: mapping };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getMappingsByUserId(userRefId: string) {
    try {
      const mappings = await userProjectMappingRepository.findByUserId(userRefId);
      return { success: true, data: mappings };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getMappingsByProjectId(projectRefId: string) {
    try {
      const mappings = await userProjectMappingRepository.findByProjectId(projectRefId);
      return { success: true, data: mappings };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getAllMappings() {
    try {
      const mappings = await userProjectMappingRepository.findAll();
      return { success: true, data: mappings };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async updateMapping(id: string, updateData: { userRefId?: string; projectRefId?: string }, updatedById?: string) {
    try {
      const existingMapping = await userProjectMappingRepository.findById(id);
      if (!existingMapping) {
        return { success: false, message: 'User project mapping not found' };
      }

      // Validate if new user exists
      if (updateData.userRefId) {
        const user = await userRepository.findById(updateData.userRefId);
        if (!user) {
          return { success: false, message: 'User not found' };
        }
      }

      // Validate if new project exists
      if (updateData.projectRefId) {
        const project = await projectRepository.findById(updateData.projectRefId);
        if (!project) {
          return { success: false, message: 'Project not found' };
        }
      }

      // Check for duplicate mapping
      const userIdToCheck = updateData.userRefId || existingMapping.userRefId.toString();
      const projectIdToCheck = updateData.projectRefId || existingMapping.projectRefId.toString();

      const duplicateMapping = await userProjectMappingRepository.findByUserAndProject(
        userIdToCheck,
        projectIdToCheck
      );

      if (duplicateMapping && duplicateMapping._id?.toString() !== id) {
        return { success: false, message: 'User already exists on this project' };
      }

      const dataToUpdate: Partial<IUserProjectMapping> = {};

      if (updateData.userRefId) {
        dataToUpdate.userRefId = new mongoose.Types.ObjectId(updateData.userRefId);
      }

      if (updateData.projectRefId) {
        dataToUpdate.projectRefId = new mongoose.Types.ObjectId(updateData.projectRefId);
      }

      if (updatedById) {
        dataToUpdate.updatedBy = new mongoose.Types.ObjectId(updatedById);
      }

      const updatedMapping = await userProjectMappingRepository.update(id, dataToUpdate);
      return { success: true, data: updatedMapping };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async deleteMapping(id: string) {
    try {
      const mapping = await userProjectMappingRepository.delete(id);
      if (!mapping) {
        return { success: false, message: 'User project mapping not found' };
      }
      return { success: true, message: 'User project mapping deleted successfully' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
}

export const userProjectMappingService = new UserProjectMappingService();


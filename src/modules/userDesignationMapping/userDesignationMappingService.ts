import { userDesignationMappingRepository } from './userDesignationMappingRepository';
import { IUserDesignationMapping } from '../../models/userDesignationMapping';
import mongoose from 'mongoose';

export class UserDesignationMappingService {
  async create(
    data: { userId: string; designationId: string },
    createdById?: string
  ): Promise<{ success: boolean; data?: IUserDesignationMapping; message: string }> {
    try {
      // Validate user exists
      const userExists = await userDesignationMappingRepository.userExists(data.userId);
      if (!userExists) {
        return { success: false, message: 'User not found' };
      }

      // Validate designation exists
      const designationExists = await userDesignationMappingRepository.designationExists(data.designationId);
      if (!designationExists) {
        return { success: false, message: 'Designation not found' };
      }

      // Check if mapping already exists
      const existingMapping = await userDesignationMappingRepository.findByUserAndDesignation(
        data.userId,
        data.designationId
      );
      if (existingMapping) {
        return { success: false, message: 'User already has this designation' };
      }

      const mappingData: Partial<IUserDesignationMapping> = {
        userId: new mongoose.Types.ObjectId(data.userId),
        designationId: new mongoose.Types.ObjectId(data.designationId),
        ...(createdById && mongoose.Types.ObjectId.isValid(createdById)
          ? { createdBy: new mongoose.Types.ObjectId(createdById) }
          : {})
      };

      const mapping = await userDesignationMappingRepository.create(mappingData);
      const populatedMapping = await userDesignationMappingRepository.findById(mapping._id.toString());
      
      return { success: true, data: populatedMapping!, message: 'User designation mapping created successfully' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to create mapping' };
    }
  }

  async getById(id: string): Promise<{ success: boolean; data?: IUserDesignationMapping; message: string }> {
    try {
      const mapping = await userDesignationMappingRepository.findById(id);
      if (!mapping) {
        return { success: false, message: 'Mapping not found' };
      }
      return { success: true, data: mapping, message: 'Mapping retrieved successfully' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to retrieve mapping' };
    }
  }

  async getByUserId(userId: string): Promise<{ success: boolean; data?: IUserDesignationMapping[]; message: string }> {
    try {
      const mappings = await userDesignationMappingRepository.findByUserId(userId);
      return { success: true, data: mappings, message: 'Mappings retrieved successfully' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to retrieve mappings' };
    }
  }

  async getByDesignationId(designationId: string): Promise<{ success: boolean; data?: IUserDesignationMapping[]; message: string }> {
    try {
      const mappings = await userDesignationMappingRepository.findByDesignationId(designationId);
      return { success: true, data: mappings, message: 'Mappings retrieved successfully' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to retrieve mappings' };
    }
  }

  async getAll(): Promise<{ success: boolean; data?: IUserDesignationMapping[]; message: string }> {
    try {
      const mappings = await userDesignationMappingRepository.findAll();
      return { success: true, data: mappings, message: 'Mappings retrieved successfully' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to retrieve mappings' };
    }
  }

  async update(
    id: string,
    updateData: { userId?: string; designationId?: string },
    updatedById?: string
  ): Promise<{ success: boolean; data?: IUserDesignationMapping; message: string }> {
    try {
      const existing = await userDesignationMappingRepository.findById(id);
      if (!existing) {
        return { success: false, message: 'Mapping not found' };
      }

      // Validate user if being updated
      if (updateData.userId) {
        const userExists = await userDesignationMappingRepository.userExists(updateData.userId);
        if (!userExists) {
          return { success: false, message: 'User not found' };
        }
      }

      // Validate designation if being updated
      if (updateData.designationId) {
        const designationExists = await userDesignationMappingRepository.designationExists(updateData.designationId);
        if (!designationExists) {
          return { success: false, message: 'Designation not found' };
        }
      }

      // Check for duplicate mapping
      const newUserId = updateData.userId || existing.userId.toString();
      const newDesignationId = updateData.designationId || existing.designationId.toString();
      
      if (updateData.userId || updateData.designationId) {
        const duplicateMapping = await userDesignationMappingRepository.findByUserAndDesignation(
          newUserId,
          newDesignationId
        );
        if (duplicateMapping && duplicateMapping._id?.toString() !== id) {
          return { success: false, message: 'User already has this designation' };
        }
      }

      const dataToUpdate: Partial<IUserDesignationMapping> = {
        ...(updateData.userId ? { userId: new mongoose.Types.ObjectId(updateData.userId) } : {}),
        ...(updateData.designationId ? { designationId: new mongoose.Types.ObjectId(updateData.designationId) } : {}),
        ...(updatedById && mongoose.Types.ObjectId.isValid(updatedById)
          ? { updatedBy: new mongoose.Types.ObjectId(updatedById) }
          : {})
      };

      const updated = await userDesignationMappingRepository.update(id, dataToUpdate);
      return { success: true, data: updated!, message: 'Mapping updated successfully' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to update mapping' };
    }
  }

  async delete(id: string): Promise<{ success: boolean; data?: IUserDesignationMapping; message: string }> {
    try {
      const mapping = await userDesignationMappingRepository.delete(id);
      if (!mapping) {
        return { success: false, message: 'Mapping not found' };
      }
      return { success: true, data: mapping, message: 'Mapping deleted successfully' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to delete mapping' };
    }
  }
}

export const userDesignationMappingService = new UserDesignationMappingService();


import { designationMasterRepository } from './designationMasterRepository';
import { IDesignationMaster } from '../../models/designationMaster';
import mongoose from 'mongoose';

export class DesignationMasterService {
  async create(
    data: Partial<IDesignationMaster>,
    createdById?: string
  ): Promise<{ success: boolean; data?: IDesignationMaster; message: string }> {
    try {
      // Check if designation name already exists
      const existing = await designationMasterRepository.findByName(data.designationName!);
      if (existing) {
        return { success: false, message: 'Designation name already exists' };
      }

      const designationData: Partial<IDesignationMaster> = {
        ...data,
        ...(createdById && mongoose.Types.ObjectId.isValid(createdById)
          ? { createdBy: new mongoose.Types.ObjectId(createdById) }
          : {})
      };

      const designation = await designationMasterRepository.create(designationData);
      return { success: true, data: designation, message: 'Designation created successfully' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to create designation' };
    }
  }

  async getById(id: string): Promise<{ success: boolean; data?: IDesignationMaster; message: string }> {
    try {
      const designation = await designationMasterRepository.findById(id);
      if (!designation) {
        return { success: false, message: 'Designation not found' };
      }
      return { success: true, data: designation, message: 'Designation retrieved successfully' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to retrieve designation' };
    }
  }

  async getAll(): Promise<{ success: boolean; data?: IDesignationMaster[]; message: string }> {
    try {
      const designations = await designationMasterRepository.findAll();
      return { success: true, data: designations, message: 'Designations retrieved successfully' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to retrieve designations' };
    }
  }

  async update(
    id: string,
    updateData: Partial<IDesignationMaster>,
    updatedById?: string
  ): Promise<{ success: boolean; data?: IDesignationMaster; message: string }> {
    try {
      const existing = await designationMasterRepository.findById(id);
      if (!existing) {
        return { success: false, message: 'Designation not found' };
      }

      // Check if new name conflicts with another designation
      if (updateData.designationName && updateData.designationName !== existing.designationName) {
        const nameExists = await designationMasterRepository.findByName(updateData.designationName);
        if (nameExists) {
          return { success: false, message: 'Designation name already exists' };
        }
      }

      const dataToUpdate: Partial<IDesignationMaster> = {
        ...updateData,
        ...(updatedById && mongoose.Types.ObjectId.isValid(updatedById)
          ? { updatedBy: new mongoose.Types.ObjectId(updatedById) }
          : {})
      };

      const updated = await designationMasterRepository.update(id, dataToUpdate);
      return { success: true, data: updated!, message: 'Designation updated successfully' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to update designation' };
    }
  }

  async delete(id: string): Promise<{ success: boolean; data?: IDesignationMaster; message: string }> {
    try {
      const designation = await designationMasterRepository.delete(id);
      if (!designation) {
        return { success: false, message: 'Designation not found' };
      }
      return { success: true, data: designation, message: 'Designation deleted successfully' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to delete designation' };
    }
  }
}

export const designationMasterService = new DesignationMasterService();



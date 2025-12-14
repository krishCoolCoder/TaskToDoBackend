import { DesignationMaster, IDesignationMaster } from '../../models/designationMaster';
import mongoose from 'mongoose';

export class DesignationMasterRepository {
  async create(data: Partial<IDesignationMaster>): Promise<IDesignationMaster> {
    const designation = new DesignationMaster(data);
    return await designation.save();
  }

  async findById(id: string): Promise<IDesignationMaster | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await DesignationMaster.findById(id)
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async findByName(designationName: string): Promise<IDesignationMaster | null> {
    return await DesignationMaster.findOne({ designationName: { $regex: new RegExp(`^${designationName}$`, 'i') } });
  }

  async findAll(): Promise<IDesignationMaster[]> {
    return await DesignationMaster.find()
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
  }

  async update(id: string, updateData: Partial<IDesignationMaster>): Promise<IDesignationMaster | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await DesignationMaster.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async delete(id: string): Promise<IDesignationMaster | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await DesignationMaster.findByIdAndDelete(id);
  }
}

export const designationMasterRepository = new DesignationMasterRepository();


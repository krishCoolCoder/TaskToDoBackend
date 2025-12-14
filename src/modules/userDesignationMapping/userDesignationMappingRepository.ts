import { UserDesignationMapping, IUserDesignationMapping } from '../../models/userDesignationMapping';
import { User } from '../../models/user';
import { DesignationMaster } from '../../models/designationMaster';
import mongoose from 'mongoose';

export class UserDesignationMappingRepository {
  async create(data: Partial<IUserDesignationMapping>): Promise<IUserDesignationMapping> {
    const mapping = new UserDesignationMapping(data);
    return await mapping.save();
  }

  async findById(id: string): Promise<IUserDesignationMapping | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await UserDesignationMapping.findById(id)
      .populate('userId', 'firstName lastName email')
      .populate('designationId', 'designationName')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async findByUserId(userId: string): Promise<IUserDesignationMapping[]> {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return [];
    }
    return await UserDesignationMapping.find({ userId })
      .populate('userId', 'firstName lastName email')
      .populate('designationId', 'designationName')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async findByDesignationId(designationId: string): Promise<IUserDesignationMapping[]> {
    if (!mongoose.Types.ObjectId.isValid(designationId)) {
      return [];
    }
    return await UserDesignationMapping.find({ designationId })
      .populate('userId', 'firstName lastName email')
      .populate('designationId', 'designationName')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async findByUserAndDesignation(userId: string, designationId: string): Promise<IUserDesignationMapping | null> {
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(designationId)) {
      return null;
    }
    return await UserDesignationMapping.findOne({ userId, designationId });
  }

  async findAll(): Promise<IUserDesignationMapping[]> {
    return await UserDesignationMapping.find()
      .populate('userId', 'firstName lastName email')
      .populate('designationId', 'designationName')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
  }

  async update(id: string, updateData: Partial<IUserDesignationMapping>): Promise<IUserDesignationMapping | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await UserDesignationMapping.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('userId', 'firstName lastName email')
      .populate('designationId', 'designationName')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async delete(id: string): Promise<IUserDesignationMapping | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await UserDesignationMapping.findByIdAndDelete(id);
  }

  async userExists(userId: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return false;
    }
    const user = await User.findById(userId);
    return !!user;
  }

  async designationExists(designationId: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(designationId)) {
      return false;
    }
    const designation = await DesignationMaster.findById(designationId);
    return !!designation;
  }
}

export const userDesignationMappingRepository = new UserDesignationMappingRepository();


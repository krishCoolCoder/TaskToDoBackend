import { UserRoleMapping, IUserRoleMapping } from '../../models/userRoleMapping';
import mongoose from 'mongoose';

export class UserRoleMappingRepository {
  async create(data: Partial<IUserRoleMapping>): Promise<IUserRoleMapping> {
    const mapping = new UserRoleMapping(data);
    return await mapping.save();
  }

  async findById(id: string): Promise<IUserRoleMapping | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await UserRoleMapping.findById(id)
      .populate('roleRefId', 'userRoleName')
      .populate('userRefId', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async findByUserId(userRefId: string): Promise<IUserRoleMapping[]> {
    if (!mongoose.Types.ObjectId.isValid(userRefId)) {
      return [];
    }
    return await UserRoleMapping.find({ userRefId })
      .populate('roleRefId', 'userRoleName')
      .populate('userRefId', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async findByRoleId(roleRefId: string): Promise<IUserRoleMapping[]> {
    if (!mongoose.Types.ObjectId.isValid(roleRefId)) {
      return [];
    }
    return await UserRoleMapping.find({ roleRefId })
      .populate('roleRefId', 'userRoleName')
      .populate('userRefId', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async findAll(): Promise<IUserRoleMapping[]> {
    return await UserRoleMapping.find()
      .populate('roleRefId', 'userRoleName')
      .populate('userRefId', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
  }

  async update(id: string, updateData: Partial<IUserRoleMapping>): Promise<IUserRoleMapping | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await UserRoleMapping.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('roleRefId', 'userRoleName')
      .populate('userRefId', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async delete(id: string): Promise<IUserRoleMapping | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await UserRoleMapping.findByIdAndDelete(id);
  }
}

export const userRoleMappingRepository = new UserRoleMappingRepository();


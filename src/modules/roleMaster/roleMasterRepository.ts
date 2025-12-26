import { RoleMaster, IRoleMaster } from '../../models/roleMaster';
import mongoose from 'mongoose';

export class RoleMasterRepository {
  async create(data: Partial<IRoleMaster>): Promise<IRoleMaster> {
    const role = new RoleMaster(data);
    return await role.save();
  }

  async findById(id: string): Promise<IRoleMaster | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await RoleMaster.findById(id)
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async findByName(userRoleName: string): Promise<IRoleMaster | null> {
    return await RoleMaster.findOne({ userRoleName: { $regex: new RegExp(`^${userRoleName}$`, 'i') } });
  }

  async findAll(): Promise<IRoleMaster[]> {
    return await RoleMaster.find()
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
  }

  async update(id: string, updateData: Partial<IRoleMaster>): Promise<IRoleMaster | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await RoleMaster.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async delete(id: string): Promise<IRoleMaster | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await RoleMaster.findByIdAndDelete(id);
  }
}

export const roleMasterRepository = new RoleMasterRepository();



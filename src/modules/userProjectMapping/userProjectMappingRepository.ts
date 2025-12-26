import { UserProjectMapping, IUserProjectMapping } from '../../models/userProjectMapping';
import mongoose from 'mongoose';

export class UserProjectMappingRepository {
  async create(data: Partial<IUserProjectMapping>): Promise<IUserProjectMapping> {
    const mapping = new UserProjectMapping(data);
    return await mapping.save();
  }

  async findById(id: string): Promise<IUserProjectMapping | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await UserProjectMapping.findById(id)
      .populate('userRefId', 'firstName lastName email')
      .populate('projectRefId', 'projectName projectDescription projectStatus')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async findByUserId(userRefId: string): Promise<IUserProjectMapping[]> {
    if (!mongoose.Types.ObjectId.isValid(userRefId)) {
      return [];
    }
    return await UserProjectMapping.find({ userRefId })
      .populate('userRefId', 'firstName lastName email')
      .populate('projectRefId', 'projectName projectDescription projectStatus')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async findByProjectId(projectRefId: string): Promise<IUserProjectMapping[]> {
    if (!mongoose.Types.ObjectId.isValid(projectRefId)) {
      return [];
    }
    return await UserProjectMapping.find({ projectRefId })
      .populate('userRefId', 'firstName lastName email')
      .populate('projectRefId', 'projectName projectDescription projectStatus')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async findByUserAndProject(userRefId: string, projectRefId: string): Promise<IUserProjectMapping | null> {
    if (!mongoose.Types.ObjectId.isValid(userRefId) || !mongoose.Types.ObjectId.isValid(projectRefId)) {
      return null;
    }
    return await UserProjectMapping.findOne({ userRefId, projectRefId });
  }

  async findAll(): Promise<IUserProjectMapping[]> {
    return await UserProjectMapping.find()
      .populate('userRefId', 'firstName lastName email')
      .populate('projectRefId', 'projectName projectDescription projectStatus')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
  }

  async update(id: string, updateData: Partial<IUserProjectMapping>): Promise<IUserProjectMapping | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await UserProjectMapping.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('userRefId', 'firstName lastName email')
      .populate('projectRefId', 'projectName projectDescription projectStatus')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async delete(id: string): Promise<IUserProjectMapping | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await UserProjectMapping.findByIdAndDelete(id);
  }
}

export const userProjectMappingRepository = new UserProjectMappingRepository();



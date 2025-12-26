import { Project, IProject } from '../../models/project';
import mongoose from 'mongoose';

export class ProjectRepository {
  async create(data: Partial<IProject>): Promise<IProject> {
    const project = new Project(data);
    return await project.save();
  }

  async findById(id: string): Promise<IProject | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Project.findById(id)
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async findByName(projectName: string): Promise<IProject | null> {
    return await Project.findOne({ projectName: { $regex: new RegExp(`^${projectName}$`, 'i') } });
  }

  async findAll(): Promise<IProject[]> {
    return await Project.find()
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
  }

  async findByStatus(status: string): Promise<IProject[]> {
    return await Project.find({ projectStatus: status })
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
  }

  async update(id: string, updateData: Partial<IProject>): Promise<IProject | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Project.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async delete(id: string): Promise<IProject | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Project.findByIdAndDelete(id);
  }
}

export const projectRepository = new ProjectRepository();



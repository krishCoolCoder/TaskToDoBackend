import { Task, ITask } from '../../models/task';
import mongoose from 'mongoose';

export class TaskRepository {
  async create(data: Partial<ITask>): Promise<ITask> {
    const task = new Task(data);
    return await task.save();
  }

  async findById(id: string): Promise<ITask | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Task.findById(id)
      .populate('assignedTo', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async findAll(filter: object = {}): Promise<ITask[]> {
    return await Task.find(filter)
      .populate('assignedTo', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
  }

  async findByStatus(status: string): Promise<ITask[]> {
    return await Task.find({ taskStatus: status })
      .populate('assignedTo', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
  }

  async findByAssignedTo(userId: string): Promise<ITask[]> {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return [];
    }
    return await Task.find({ assignedTo: userId })
      .populate('assignedTo', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
  }

  async findByPriority(priority: string): Promise<ITask[]> {
    return await Task.find({ priority })
      .populate('assignedTo', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
  }

  async findArchived(isArchived: boolean): Promise<ITask[]> {
    return await Task.find({ isArchived })
      .populate('assignedTo', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
  }

  async update(id: string, updateData: Partial<ITask>): Promise<ITask | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Task.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('assignedTo', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async delete(id: string): Promise<ITask | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Task.findByIdAndDelete(id);
  }
}

export const taskRepository = new TaskRepository();


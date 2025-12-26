import { TaskComment, ITaskComment } from '../../models/taskComment';
import mongoose from 'mongoose';

export class TaskCommentRepository {
  async create(data: Partial<ITaskComment>): Promise<ITaskComment> {
    const comment = new TaskComment(data);
    return await comment.save();
  }

  async findById(id: string): Promise<ITaskComment | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await TaskComment.findById(id)
      .populate('taskRefId', 'taskTitle taskDescription taskStatus')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async findByTaskId(taskRefId: string): Promise<ITaskComment[]> {
    if (!mongoose.Types.ObjectId.isValid(taskRefId)) {
      return [];
    }
    return await TaskComment.find({ taskRefId })
      .populate('taskRefId', 'taskTitle taskDescription taskStatus')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
  }

  async findAll(): Promise<ITaskComment[]> {
    return await TaskComment.find()
      .populate('taskRefId', 'taskTitle taskDescription taskStatus')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
  }

  async update(id: string, updateData: Partial<ITaskComment>): Promise<ITaskComment | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await TaskComment.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('taskRefId', 'taskTitle taskDescription taskStatus')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async delete(id: string): Promise<ITaskComment | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await TaskComment.findByIdAndDelete(id);
  }
}

export const taskCommentRepository = new TaskCommentRepository();



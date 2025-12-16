import { TaskAttachment, ITaskAttachment } from '../../models/taskAttachment';
import mongoose from 'mongoose';

export class TaskAttachmentRepository {
  async create(data: Partial<ITaskAttachment>): Promise<ITaskAttachment> {
    const attachment = new TaskAttachment(data);
    return await attachment.save();
  }

  async findById(id: string): Promise<ITaskAttachment | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await TaskAttachment.findById(id)
      .populate('taskRefId', 'taskTitle taskDescription taskStatus')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async findByTaskId(taskRefId: string): Promise<ITaskAttachment[]> {
    if (!mongoose.Types.ObjectId.isValid(taskRefId)) {
      return [];
    }
    return await TaskAttachment.find({ taskRefId })
      .populate('taskRefId', 'taskTitle taskDescription taskStatus')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
  }

  async findAll(): Promise<ITaskAttachment[]> {
    return await TaskAttachment.find()
      .populate('taskRefId', 'taskTitle taskDescription taskStatus')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
  }

  async update(id: string, updateData: Partial<ITaskAttachment>): Promise<ITaskAttachment | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await TaskAttachment.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('taskRefId', 'taskTitle taskDescription taskStatus')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async delete(id: string): Promise<ITaskAttachment | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await TaskAttachment.findByIdAndDelete(id);
  }
}

export const taskAttachmentRepository = new TaskAttachmentRepository();


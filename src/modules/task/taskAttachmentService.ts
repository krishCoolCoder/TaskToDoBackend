import { taskAttachmentRepository } from './taskAttachmentRepository';
import { taskRepository } from './taskRepository';
import { ITaskAttachment } from '../../models/taskAttachment';
import mongoose from 'mongoose';

export class TaskAttachmentService {
  async createAttachment(data: { taskRefId: string; attachment: string }, createdById?: string) {
    try {
      // Validate task exists
      const task = await taskRepository.findById(data.taskRefId);
      if (!task) {
        return { success: false, message: 'Task not found' };
      }

      const attachmentData: Partial<ITaskAttachment> = {
        taskRefId: new mongoose.Types.ObjectId(data.taskRefId),
        attachment: data.attachment,
        createdAt: new Date()
      };

      if (createdById) {
        attachmentData.createdBy = new mongoose.Types.ObjectId(createdById);
      }

      const attachment = await taskAttachmentRepository.create(attachmentData);
      const populatedAttachment = await taskAttachmentRepository.findById(attachment._id.toString());
      
      return { success: true, data: populatedAttachment };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getAttachmentById(id: string) {
    try {
      const attachment = await taskAttachmentRepository.findById(id);
      if (!attachment) {
        return { success: false, message: 'Attachment not found' };
      }
      return { success: true, data: attachment };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getAttachmentsByTaskId(taskRefId: string) {
    try {
      const attachments = await taskAttachmentRepository.findByTaskId(taskRefId);
      return { success: true, data: attachments };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getAllAttachments() {
    try {
      const attachments = await taskAttachmentRepository.findAll();
      return { success: true, data: attachments };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async updateAttachment(id: string, updateData: { attachment?: string }, updatedById?: string) {
    try {
      const existingAttachment = await taskAttachmentRepository.findById(id);
      if (!existingAttachment) {
        return { success: false, message: 'Attachment not found' };
      }

      const dataToUpdate: Partial<ITaskAttachment> = {};

      if (updateData.attachment) {
        dataToUpdate.attachment = updateData.attachment;
      }

      if (updatedById) {
        dataToUpdate.updatedBy = new mongoose.Types.ObjectId(updatedById);
      }

      const updatedAttachment = await taskAttachmentRepository.update(id, dataToUpdate);
      return { success: true, data: updatedAttachment };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async deleteAttachment(id: string) {
    try {
      const attachment = await taskAttachmentRepository.delete(id);
      if (!attachment) {
        return { success: false, message: 'Attachment not found' };
      }
      return { success: true, message: 'Attachment deleted successfully' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
}

export const taskAttachmentService = new TaskAttachmentService();


import { taskCommentRepository } from './taskCommentRepository';
import { taskRepository } from './taskRepository';
import { ITaskComment } from '../../models/taskComment';
import mongoose from 'mongoose';

export class TaskCommentService {
  async createComment(data: { taskRefId: string; taskComment: string; commentStatus?: string }, createdById?: string) {
    try {
      // Validate task exists
      const task = await taskRepository.findById(data.taskRefId);
      if (!task) {
        return { success: false, message: 'Task not found' };
      }

      const commentData: Partial<ITaskComment> = {
        taskRefId: new mongoose.Types.ObjectId(data.taskRefId),
        taskComment: data.taskComment,
        commentStatus: data.commentStatus || 'active',
        createdAt: new Date()
      };

      if (createdById) {
        commentData.createdBy = new mongoose.Types.ObjectId(createdById);
      }

      const comment = await taskCommentRepository.create(commentData);
      const populatedComment = await taskCommentRepository.findById(comment._id.toString());
      
      return { success: true, data: populatedComment };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getCommentById(id: string) {
    try {
      const comment = await taskCommentRepository.findById(id);
      if (!comment) {
        return { success: false, message: 'Comment not found' };
      }
      return { success: true, data: comment };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getCommentsByTaskId(taskRefId: string) {
    try {
      const comments = await taskCommentRepository.findByTaskId(taskRefId);
      return { success: true, data: comments };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getAllComments() {
    try {
      const comments = await taskCommentRepository.findAll();
      return { success: true, data: comments };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async updateComment(id: string, updateData: { taskComment?: string; commentStatus?: string }, updatedById?: string) {
    try {
      const existingComment = await taskCommentRepository.findById(id);
      if (!existingComment) {
        return { success: false, message: 'Comment not found' };
      }

      const dataToUpdate: Partial<ITaskComment> = {};

      if (updateData.taskComment) {
        dataToUpdate.taskComment = updateData.taskComment;
      }

      if (updateData.commentStatus) {
        dataToUpdate.commentStatus = updateData.commentStatus;
      }

      if (updatedById) {
        dataToUpdate.updatedBy = new mongoose.Types.ObjectId(updatedById);
      }

      const updatedComment = await taskCommentRepository.update(id, dataToUpdate);
      return { success: true, data: updatedComment };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async deleteComment(id: string) {
    try {
      const comment = await taskCommentRepository.delete(id);
      if (!comment) {
        return { success: false, message: 'Comment not found' };
      }
      return { success: true, message: 'Comment deleted successfully' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
}

export const taskCommentService = new TaskCommentService();


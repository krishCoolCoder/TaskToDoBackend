import { taskRepository } from './taskRepository';
import { ITask } from '../../models/task';
import { userRepository } from '../user/userRepository';
import mongoose from 'mongoose';

export class TaskService {
  async createTask(data: Partial<ITask>, createdById?: string) {
    try {
      // Validate assignedTo user exists if provided
      if (data.assignedTo) {
        const user = await userRepository.findById(data.assignedTo.toString());
        if (!user) {
          return { success: false, message: 'Assigned user not found' };
        }
      }

      const taskData: Partial<ITask> = {
        ...data,
        createdAt: new Date()
      };

      if (createdById) {
        taskData.createdBy = new mongoose.Types.ObjectId(createdById);
      }

      const task = await taskRepository.create(taskData);
      const populatedTask = await taskRepository.findById(task._id.toString());
      
      return { success: true, data: populatedTask };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getTaskById(id: string) {
    try {
      const task = await taskRepository.findById(id);
      if (!task) {
        return { success: false, message: 'Task not found' };
      }
      return { success: true, data: task };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getAllTasks(filter: object = {}) {
    try {
      const tasks = await taskRepository.findAll(filter);
      return { success: true, data: tasks };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getTasksByStatus(status: string) {
    try {
      const tasks = await taskRepository.findByStatus(status);
      return { success: true, data: tasks };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getTasksByAssignedTo(userId: string) {
    try {
      const tasks = await taskRepository.findByAssignedTo(userId);
      return { success: true, data: tasks };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getTasksByPriority(priority: string) {
    try {
      const tasks = await taskRepository.findByPriority(priority);
      return { success: true, data: tasks };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getArchivedTasks(isArchived: boolean) {
    try {
      const tasks = await taskRepository.findArchived(isArchived);
      return { success: true, data: tasks };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async updateTask(id: string, updateData: Partial<ITask>, updatedById?: string) {
    try {
      const existingTask = await taskRepository.findById(id);
      if (!existingTask) {
        return { success: false, message: 'Task not found' };
      }

      // Validate assignedTo user exists if being updated
      if (updateData.assignedTo) {
        const user = await userRepository.findById(updateData.assignedTo.toString());
        if (!user) {
          return { success: false, message: 'Assigned user not found' };
        }
      }

      if (updatedById) {
        updateData.updatedBy = new mongoose.Types.ObjectId(updatedById);
      }

      const updatedTask = await taskRepository.update(id, updateData);
      return { success: true, data: updatedTask };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async deleteTask(id: string) {
    try {
      const task = await taskRepository.delete(id);
      if (!task) {
        return { success: false, message: 'Task not found' };
      }
      return { success: true, message: 'Task deleted successfully' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async archiveTask(id: string, updatedById?: string) {
    try {
      const existingTask = await taskRepository.findById(id);
      if (!existingTask) {
        return { success: false, message: 'Task not found' };
      }

      const updateData: Partial<ITask> = { isArchived: true };
      if (updatedById) {
        updateData.updatedBy = new mongoose.Types.ObjectId(updatedById);
      }

      const updatedTask = await taskRepository.update(id, updateData);
      return { success: true, data: updatedTask, message: 'Task archived successfully' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async unarchiveTask(id: string, updatedById?: string) {
    try {
      const existingTask = await taskRepository.findById(id);
      if (!existingTask) {
        return { success: false, message: 'Task not found' };
      }

      const updateData: Partial<ITask> = { isArchived: false };
      if (updatedById) {
        updateData.updatedBy = new mongoose.Types.ObjectId(updatedById);
      }

      const updatedTask = await taskRepository.update(id, updateData);
      return { success: true, data: updatedTask, message: 'Task unarchived successfully' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
}

export const taskService = new TaskService();



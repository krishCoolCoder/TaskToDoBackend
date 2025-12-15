import { projectRepository } from './projectRepository';
import { IProject } from '../../models/project';
import mongoose from 'mongoose';

export class ProjectService {
  async createProject(data: Partial<IProject>, createdById?: string) {
    try {
      // Check if project with same name already exists
      const existingProject = await projectRepository.findByName(data.projectName!);
      if (existingProject) {
        return { success: false, message: 'Project with this name already exists' };
      }

      const projectData: Partial<IProject> = {
        ...data,
        createdAt: new Date()
      };

      if (createdById) {
        projectData.createdBy = new mongoose.Types.ObjectId(createdById);
      }

      const project = await projectRepository.create(projectData);
      return { success: true, data: project };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getProjectById(id: string) {
    try {
      const project = await projectRepository.findById(id);
      if (!project) {
        return { success: false, message: 'Project not found' };
      }
      return { success: true, data: project };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getAllProjects() {
    try {
      const projects = await projectRepository.findAll();
      return { success: true, data: projects };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getProjectsByStatus(status: string) {
    try {
      const projects = await projectRepository.findByStatus(status);
      return { success: true, data: projects };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async updateProject(id: string, updateData: Partial<IProject>, updatedById?: string) {
    try {
      const existingProject = await projectRepository.findById(id);
      if (!existingProject) {
        return { success: false, message: 'Project not found' };
      }

      // Check if new name conflicts with another project
      if (updateData.projectName) {
        const duplicateProject = await projectRepository.findByName(updateData.projectName);
        if (duplicateProject && duplicateProject._id?.toString() !== id) {
          return { success: false, message: 'Project with this name already exists' };
        }
      }

      if (updatedById) {
        updateData.updatedBy = new mongoose.Types.ObjectId(updatedById);
      }

      const updatedProject = await projectRepository.update(id, updateData);
      return { success: true, data: updatedProject };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async deleteProject(id: string) {
    try {
      const project = await projectRepository.delete(id);
      if (!project) {
        return { success: false, message: 'Project not found' };
      }
      return { success: true, message: 'Project deleted successfully' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
}

export const projectService = new ProjectService();


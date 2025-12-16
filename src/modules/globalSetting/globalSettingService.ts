import { globalSettingRepository } from './globalSettingRepository';
import { IGlobalSetting } from '../../models/globalSetting';
import mongoose from 'mongoose';

export class GlobalSettingService {
  async createSetting(data: Partial<IGlobalSetting>, createdById?: string) {
    try {
      const settingData: Partial<IGlobalSetting> = {
        ...data,
        createdAt: new Date()
      };

      if (createdById) {
        settingData.createdBy = new mongoose.Types.ObjectId(createdById);
      }

      const setting = await globalSettingRepository.create(settingData);
      const populatedSetting = await globalSettingRepository.findById(setting._id.toString());
      
      return { success: true, data: populatedSetting };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getSettingById(id: string) {
    try {
      const setting = await globalSettingRepository.findById(id);
      if (!setting) {
        return { success: false, message: 'Global setting not found' };
      }
      return { success: true, data: setting };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getAllSettings() {
    try {
      const settings = await globalSettingRepository.findAll();
      return { success: true, data: settings };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getLatestSetting() {
    try {
      const setting = await globalSettingRepository.findLatest();
      if (!setting) {
        return { success: false, message: 'No global settings found' };
      }
      return { success: true, data: setting };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async updateSetting(id: string, updateData: Partial<IGlobalSetting>, updatedById?: string) {
    try {
      const existingSetting = await globalSettingRepository.findById(id);
      if (!existingSetting) {
        return { success: false, message: 'Global setting not found' };
      }

      if (updatedById) {
        updateData.updatedBy = new mongoose.Types.ObjectId(updatedById);
      }

      const updatedSetting = await globalSettingRepository.update(id, updateData);
      return { success: true, data: updatedSetting };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async deleteSetting(id: string) {
    try {
      const setting = await globalSettingRepository.delete(id);
      if (!setting) {
        return { success: false, message: 'Global setting not found' };
      }
      return { success: true, message: 'Global setting deleted successfully' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async getApplicationStatus() {
    try {
      const setting = await globalSettingRepository.findLatest();
      if (!setting) {
        return { 
          success: true, 
          data: { 
            applicationStatus: 'online',
            message: 'No settings configured, defaulting to online'
          } 
        };
      }
      return { 
        success: true, 
        data: {
          applicationStatus: setting.applicationStatus,
          scheduledTime: setting.scheduledTime,
          maintenanceMessage: setting.maintenanceMessage,
          maintenanceDuration: setting.maintenanceDuration
        }
      };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
}

export const globalSettingService = new GlobalSettingService();


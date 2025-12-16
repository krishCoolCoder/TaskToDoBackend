import { GlobalSetting, IGlobalSetting } from '../../models/globalSetting';
import mongoose from 'mongoose';

export class GlobalSettingRepository {
  async create(data: Partial<IGlobalSetting>): Promise<IGlobalSetting> {
    const setting = new GlobalSetting(data);
    return await setting.save();
  }

  async findById(id: string): Promise<IGlobalSetting | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await GlobalSetting.findById(id)
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async findAll(): Promise<IGlobalSetting[]> {
    return await GlobalSetting.find()
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
  }

  async findLatest(): Promise<IGlobalSetting | null> {
    return await GlobalSetting.findOne()
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
  }

  async update(id: string, updateData: Partial<IGlobalSetting>): Promise<IGlobalSetting | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await GlobalSetting.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
  }

  async delete(id: string): Promise<IGlobalSetting | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await GlobalSetting.findByIdAndDelete(id);
  }

  async count(): Promise<number> {
    return await GlobalSetting.countDocuments();
  }
}

export const globalSettingRepository = new GlobalSettingRepository();


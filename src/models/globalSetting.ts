import mongoose, { Schema, Document } from 'mongoose';

export interface IGlobalSetting extends Document {
  applicationStatus: 'online' | 'offline' | 'scheduled';
  scheduledTime?: Date;
  maintenanceMessage?: string;
  maintenanceDuration?: string;
  maxTasksPerUser?: number | null;
  maxCommentPerTask?: number | null;
  maxAttachmentsPerTask?: number | null;
  maxAttachmentSizeMB?: number | null;
  maxProjectPerUser?: number | null;
  createdAt: Date;
  createdBy?: mongoose.Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: mongoose.Types.ObjectId;
}

const globalSettingSchema = new Schema<IGlobalSetting>({
  applicationStatus: {
    type: String,
    enum: {
      values: ['online', 'offline', 'scheduled'],
      message: 'Application status must be online, offline, or scheduled'
    },
    default: 'online'
  },
  scheduledTime: {
    type: Date
  },
  maintenanceMessage: {
    type: String,
    trim: true
  },
  maintenanceDuration: {
    type: String,
    trim: true
  },
  maxTasksPerUser: {
    type: Number,
    default: null
  },
  maxCommentPerTask: {
    type: Number,
    default: null
  },
  maxAttachmentsPerTask: {
    type: Number,
    default: null
  },
  maxAttachmentSizeMB: {
    type: Number,
    default: null
  },
  maxProjectPerUser: {
    type: Number,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedAt: {
    type: Date
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Update the updatedAt field before saving
globalSettingSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

export const GlobalSetting = mongoose.model<IGlobalSetting>('GlobalSetting', globalSettingSchema);



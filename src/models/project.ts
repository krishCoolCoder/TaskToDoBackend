import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  projectName: string;
  projectDescription: string;
  projectTitle?: string;
  projectHeaderColor?: string;
  projectSidebarColor?: string;
  projectStatus: 'active' | 'inactive';
  createdAt: Date;
  createdBy?: mongoose.Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: mongoose.Types.ObjectId;
}

const projectSchema = new Schema<IProject>({
  projectName: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true
  },
  projectDescription: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true
  },
  projectTitle: {
    type: String,
    trim: true
  },
  projectHeaderColor: {
    type: String,
    trim: true
  },
  projectSidebarColor: {
    type: String,
    trim: true
  },
  projectStatus: {
    type: String,
    enum: {
      values: ['active', 'inactive'],
      message: 'Project status must be either active or inactive'
    },
    default: 'active'
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
projectSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

export const Project = mongoose.model<IProject>('Project', projectSchema);



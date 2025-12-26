import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  taskTitle: string;
  taskDescription: string;
  taskStatus: string;
  assignedTo?: mongoose.Types.ObjectId;
  priority: string;
  startTime?: string;
  dueTime?: string;
  completedAt?: string;
  estimatedTime?: string;
  actualTime?: string;
  taskType: string;
  taskCategory?: string;
  taskTags?: string;
  progress?: string;
  isArchived: boolean;
  createdAt: Date;
  createdBy?: mongoose.Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>({
  taskTitle: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true
  },
  taskDescription: {
    type: String,
    required: [true, 'Task description is required'],
    trim: true
  },
  taskStatus: {
    type: String,
    required: [true, 'Task status is required'],
    trim: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  priority: {
    type: String,
    required: [true, 'Priority is required'],
    trim: true
  },
  startTime: {
    type: String,
    trim: true
  },
  dueTime: {
    type: String,
    trim: true
  },
  completedAt: {
    type: String,
    trim: true
  },
  estimatedTime: {
    type: String,
    trim: true
  },
  actualTime: {
    type: String,
    trim: true
  },
  taskType: {
    type: String,
    trim: true,
    default: 'open'
  },
  taskCategory: {
    type: String,
    trim: true
  },
  taskTags: {
    type: String,
    trim: true
  },
  progress: {
    type: String,
    trim: true
  },
  isArchived: {
    type: Boolean,
    default: false
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
taskSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

export const Task = mongoose.model<ITask>('Task', taskSchema);



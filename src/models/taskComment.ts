import mongoose, { Schema, Document } from 'mongoose';

export interface ITaskComment extends Document {
  taskRefId: mongoose.Types.ObjectId;
  taskComment: string;
  commentStatus: string;
  createdAt: Date;
  createdBy?: mongoose.Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: mongoose.Types.ObjectId;
}

const taskCommentSchema = new Schema<ITaskComment>({
  taskRefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: [true, 'Task reference ID is required']
  },
  taskComment: {
    type: String,
    required: [true, 'Task comment is required'],
    trim: true
  },
  commentStatus: {
    type: String,
    default: 'active',
    trim: true
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
taskCommentSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

export const TaskComment = mongoose.model<ITaskComment>('TaskComment', taskCommentSchema);


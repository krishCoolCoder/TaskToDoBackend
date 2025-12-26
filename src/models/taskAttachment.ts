import mongoose, { Schema, Document } from 'mongoose';

export interface ITaskAttachment extends Document {
  taskRefId: mongoose.Types.ObjectId;
  attachment: string;
  createdAt: Date;
  createdBy?: mongoose.Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: mongoose.Types.ObjectId;
}

const taskAttachmentSchema = new Schema<ITaskAttachment>({
  taskRefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: [true, 'Task reference ID is required']
  },
  attachment: {
    type: String,
    required: [true, 'Attachment is required'],
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
taskAttachmentSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

export const TaskAttachment = mongoose.model<ITaskAttachment>('TaskAttachment', taskAttachmentSchema);



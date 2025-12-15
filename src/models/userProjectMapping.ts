import mongoose, { Schema, Document } from 'mongoose';

export interface IUserProjectMapping extends Document {
  userRefId: mongoose.Types.ObjectId;
  projectRefId: mongoose.Types.ObjectId;
  createdAt: Date;
  createdBy?: mongoose.Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: mongoose.Types.ObjectId;
}

const userProjectMappingSchema = new Schema<IUserProjectMapping>({
  userRefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference ID is required']
  },
  projectRefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Project reference ID is required']
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
userProjectMappingSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

export const UserProjectMapping = mongoose.model<IUserProjectMapping>('UserProjectMapping', userProjectMappingSchema);


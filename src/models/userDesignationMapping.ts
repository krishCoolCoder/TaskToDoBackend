import mongoose, { Schema, Document } from 'mongoose';

export interface IUserDesignationMapping extends Document {
  userId: mongoose.Types.ObjectId;
  designationId: mongoose.Types.ObjectId;
  createdAt: Date;
  createdBy?: mongoose.Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: mongoose.Types.ObjectId;
}

const userDesignationMappingSchema = new Schema<IUserDesignationMapping>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  designationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DesignationMaster',
    required: [true, 'Designation ID is required']
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
userDesignationMappingSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

export const UserDesignationMapping = mongoose.model<IUserDesignationMapping>('UserDesignationMapping', userDesignationMappingSchema);



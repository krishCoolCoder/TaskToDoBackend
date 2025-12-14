import mongoose, { Schema, Document } from 'mongoose';

export interface IDesignationMaster extends Document {
  designationName: string;
  createdAt: Date;
  createdBy?: mongoose.Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: mongoose.Types.ObjectId;
}

const designationMasterSchema = new Schema<IDesignationMaster>({
  designationName: {
    type: String,
    required: [true, 'Designation name is required'],
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
designationMasterSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

export const DesignationMaster = mongoose.model<IDesignationMaster>('DesignationMaster', designationMasterSchema);


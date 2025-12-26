import mongoose, { Schema, Document } from 'mongoose';

export interface IRoleMaster extends Document {
  userRoleName: string;
  createdAt: Date;
  createdBy?: mongoose.Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: mongoose.Types.ObjectId;
}

const roleMasterSchema = new Schema<IRoleMaster>({
  userRoleName: {
    type: String,
    required: [true, 'User role name is required'],
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
roleMasterSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

export const RoleMaster = mongoose.model<IRoleMaster>('RoleMaster', roleMasterSchema);



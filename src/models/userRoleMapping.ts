import mongoose, { Schema, Document } from 'mongoose';

export interface IUserRoleMapping extends Document {
  roleRefId: mongoose.Types.ObjectId;
  userRefId: mongoose.Types.ObjectId;
  createdAt: Date;
  createdBy?: mongoose.Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: mongoose.Types.ObjectId;
}

const userRoleMappingSchema = new Schema<IUserRoleMapping>({
  roleRefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoleMaster',
    required: [true, 'Role reference ID is required']
  },
  userRefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference ID is required']
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
userRoleMappingSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

export const UserRoleMapping = mongoose.model<IUserRoleMapping>('UserRoleMapping', userRoleMappingSchema);


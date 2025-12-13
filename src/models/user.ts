import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  mobileNumber: string;
  password: string;
  userStatus: 'active' | 'inactive' | 'blocked';
  createdAt: Date;
  createdBy?: mongoose.Types.ObjectId;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  middleName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  userStatus: {
    type: String,
    enum: {
      values: ['active', 'inactive', 'blocked'],
      message: 'User status must be either active, inactive, or blocked'
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
  }
});

// Update the updatedAt field before saving
userSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

export const User = mongoose.model<IUser>('User', userSchema);


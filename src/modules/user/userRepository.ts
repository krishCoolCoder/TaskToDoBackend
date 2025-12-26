import { User, IUser } from '../../models/user';
import mongoose from 'mongoose';

export class UserRepository {
  async create(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return await user.save();
  }

  async findById(id: string): Promise<IUser | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await User.findById(id).select('-password');
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email: email.toLowerCase() });
  }

  async findAll(filter: object = {}): Promise<IUser[]> {
    return await User.find(filter).select('-password').sort({ createdAt: -1 });
  }

  async update(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');
  }

  async delete(id: string): Promise<IUser | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await User.findByIdAndDelete(id);
  }

  async findByMobileNumber(mobileNumber: string): Promise<IUser | null> {
    return await User.findOne({ mobileNumber });
  }
}

export const userRepository = new UserRepository();



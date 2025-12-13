import { User, IUser } from '../../models/user';

export class AuthRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email: email.toLowerCase() });
  }

  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async updatePassword(userId: string, newPassword: string): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
      userId,
      { 
        $set: { 
          password: newPassword,
          updatedAt: new Date()
        } 
      },
      { new: true }
    );
  }

  async findByMobileNumber(mobileNumber: string): Promise<IUser | null> {
    return await User.findOne({ mobileNumber });
  }
}

export const authRepository = new AuthRepository();


import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { UserDTO } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // post a new user
  async postUser(userDTO: UserDTO): Promise<User> {
    const result = await this.userModel(userDTO);
    return result.save();
  }

  // validate email
  async validateEmail(emailUser: string): Promise<User> {
    const result = await this.userModel
      .find({ email: emailUser })
      .select('email')
      .exec();
    return result;
  }

  // update user
  async updateUser(userId: number, userDTO: UserDTO): Promise<User> {
    const result = await this.userModel.findOneAndUpdate(userId, userDTO, {
      new: true,
    });
    return result;
  }
}

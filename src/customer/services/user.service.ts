import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { UserDTO } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // post a new user
  async postUser(userDTO: UserDTO): Promise<User> {
    if (
      !userDTO.name ||
      !userDTO.email ||
      !userDTO.displayName ||
      !userDTO.password
    ) {
      throw new HttpException('User already exists.', HttpStatus.BAD_REQUEST);
    }
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
    if (
      !userDTO.name ||
      !userDTO.email ||
      !userDTO.displayName ||
      !userDTO.password
    ) {
      throw new HttpException('User already exists.', HttpStatus.BAD_REQUEST);
    }
    const result = await this.userModel.findOneAndUpdate(userId, userDTO, {
      new: true,
    });
    if (!result) {
      throw new NotFoundException('User does not exist');
    }
    return result;
  }

  // find email to login
  async findOneByEmail(emailUser: string): Model<User> {
    const result = await this.userModel.findOne({ email: emailUser });
    return result;
  }

  // find password to login
  async checkPassword(PasswordUser: string): Model<User> {
    const result = await this.userModel.findOne({ password: PasswordUser });
    return result;
  }

  // get user from email
  async getUserByEmail(emailUser: string) {
    const result = await this.userModel
      .find({ email: emailUser })
      .select('_id name displayName email avatar')
      .exec();
    return result;
  }

  // delete user
  async deleteUser(idUser: number) {
    const result = await this.userModel.findOneAndDelete(idUser);
    return result;
  }

  private createNewToken() {}
}

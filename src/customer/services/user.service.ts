import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { UserDTO } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async postUser(userDTO: UserDTO): Promise<User> {
    const newUser = await this.userModel(userDTO);
    return newUser.save();
  }
}

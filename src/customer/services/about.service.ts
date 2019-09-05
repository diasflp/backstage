import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { About } from '../interfaces/about.interface';
import { AboutDTO } from '../dto/about.dto';

@Injectable()
export class AboutService {
  constructor(
    @InjectModel('About') private readonly aboutModel: Model<About>,
  ) {}

  // get all about
  async getAllAbout(): Promise<About[]> {
    const result = await this.aboutModel
      .find()
      .populate('user')
      .exec();
    return result;
  }

  // get about from user
  async getByIdUserAbout(idUser: number): Promise<About> {
    const result = await this.aboutModel
      .find({ user: idUser })
      .select('_id description skill')
      .exec();
    return result;
  }

  // post about
  async postAbout(aboutDTO: AboutDTO): Promise<About> {
    const result = await this.aboutModel(aboutDTO);
    return result.save();
  }

  // edit about
  async updateAbout(idDescription: number, aboutDTO: AboutDTO): Promise<About> {
    const result = await this.aboutModel.findOneAndUpdate(
      idDescription,
      aboutDTO,
      { new: true },
    );
    return result;
  }

  // delete about
  async deleteAbout(idDescription: number): Promise<any> {
    const result = await this.aboutModel.findOneAndDelete(idDescription);
    return result;
  }
}

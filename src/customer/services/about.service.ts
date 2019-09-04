import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { About } from '../interfaces/about.interface';
import { AboutDTO } from '../dto/about.dto';

@Injectable()
export class AboutService {
  constructor(
    @InjectModel('Customer') private readonly aboutModel: Model<About>,
  ) {}

  // get all description
  async getAllDescription(): Promise<About[]> {
    const description = await this.aboutModel.find().exec();
    return description;
  }

  // get a single description
  async getByIdDescription(idDescription: number): Promise<About> {
    const description = await this.aboutModel.findById(idDescription).exec();
    return description;
  }

  // post description
  async postDescription(aboutDTO: AboutDTO): Promise<About> {
    const newDescription = await this.aboutModel(aboutDTO);
    return newDescription.save();
  }

  // edit description
  async updateDescriptio(
    idDescription: number,
    aboutDTO: AboutDTO,
  ): Promise<About> {
    const description = await this.aboutModel.findByIdAndUpdate(
      idDescription,
      aboutDTO,
      { new: true },
    );
    return description;
  }

  // delete description
  async deleteDescription(idDescription: number): Promise<any> {
    const description = await this.aboutModel.findByIdAndRemove(idDescription);
    return description;
  }
}

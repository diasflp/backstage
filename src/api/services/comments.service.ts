import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments } from '../interfaces/comments.interface';
import { CommentsDTO } from '../dto/comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comments') private readonly commentsModel: Model<Comments>,
  ) {}

  // get all comments
  async getAllComments(): Promise<Comments[]> {
    const result = await this.commentsModel
      .find()
      .populate('user')
      .exec();
    return result;
  }

  // get comments from user
  async getByIdUserComments(idUser: number): Promise<Comments> {
    const result = await this.commentsModel
      .find({ user: idUser })
      .select('_id comment like publish updateat')
      .exec();
    if (!result) {
      throw new NotFoundException('not found.');
    }
    return result;
  }

  // post comments
  async postComments(commentsDTO: CommentsDTO): Promise<Comments> {
    if (!commentsDTO.comment) {
      throw new HttpException(
        'Required field not filled in.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.commentsModel(CommentsDTO);
    return result.save();
  }

  // post user like comments
  async setUserLike(
    idUser: number,
    idComments: number,
    commentsDTO: CommentsDTO,
  ): Promise<Comments> {
    const result = await this.commentsModel.findOneAndUpdate(
      idUser,
      idComments,
      commentsDTO,
      { new: true },
    );
    if (!result) {
      throw new NotFoundException('Comments does not exist.');
    }
    return result;
  }

  // edit comments
  async updateComments(
    idComments: number,
    commentsDTO: CommentsDTO,
  ): Promise<Comments> {
    if (!commentsDTO.comment) {
      throw new HttpException(
        'Required field not filled in.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.commentsModel.findOneAndUpdate(
      idComments,
      commentsDTO,
      { new: true },
    );
    if (!result) {
      throw new NotFoundException('Comments does not exist.');
    }
    return result;
  }

  // delete comments
  async deleteComments(idComments: number): Promise<any> {
    const result = await this.commentsModel.findOneAndDelete(idComments);
    if (!result) {
      throw new NotFoundException('Comments does not exist.');
    }
    return result;
  }
}

import { User } from '../interfaces/user.interface';
import { LikeInterface } from '../interfaces/comments.interface';

export class CommentsDTO {
  readonly comment: string;
  readonly user: User;
  readonly publish: boolean;
  readonly like: LikeInterface[];
  readonly created: Date;
  readonly updateat: Date;
}

import { User } from '../interfaces/user.interface';

export class CommentsDTO {
  readonly comment: string;
  readonly user: User;
  readonly publish: boolean;
  readonly created: Date;
  readonly updateat: Date;
}

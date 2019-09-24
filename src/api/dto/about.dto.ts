import { Skillinterface } from '../interfaces/about.interface';
import { User } from '../interfaces/user.interface';

export class AboutDTO {
  readonly description: string;
  readonly skill: Skillinterface[];
  readonly created: Date;
  readonly user: User;
}

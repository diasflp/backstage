import { Skillinterface } from '../interfaces/about.interface';

export class AboutDTO {
  readonly description: string;
  readonly skill: Skillinterface[];
  readonly created: Date;
}

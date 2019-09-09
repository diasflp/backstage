export class UserDTO {
  passwordHash: string;
  password: string;
  readonly name: string;
  readonly displayName: string;
  readonly email: string;
  readonly avatar: string;
  readonly created: Date;
}

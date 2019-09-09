import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../../dto/login-user.dto';
import { UserService } from '../../services/user.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserDTO } from '../../dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUserByPassword(loginAttempt: LoginUserDto) {
    // This will be used for the initial login
    const userToAttempt = await this.usersService.findOneByEmail(
      loginAttempt.email,
    );
    const userPassword = await this.usersService.compareHash(
      loginAttempt.password,
      userToAttempt.passwordHash,
    );
    return new Promise(resolve => {
      if (userPassword && userToAttempt) {
        resolve(this.createJwtPayload(userToAttempt));
      } else {
        throw new HttpException(
          'Email or password invalid.',
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }

  createJwtPayload(user: UserDTO) {
    const data: JwtPayload = {
      email: user.email,
    };

    const jwt = this.jwtService.sign(data);

    return {
      expiresIn: 3600,
      token: jwt,
    };
  }
}

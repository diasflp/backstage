import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  UnauthorizedException,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../../dto/login-user.dto';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environment';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.validateUserByPassword(loginUserDto);
  }

  @Get('/user')
  async getUser(@Res() res, @Req() req) {
    jwt.verify(
      req.headers.authorization,
      environment.privateKeyJWT,
      (error, encode) => {
        if (!encode) {
          throw new UnauthorizedException();
        }
        this.sendUser(res, encode.email);
      },
    );
  }

  private async sendUser(res, email: string) {
    const result = await this.userService.getUserByEmail(email);
    return res.status(HttpStatus.OK).json(result);
  }
}

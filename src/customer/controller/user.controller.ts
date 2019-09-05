import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  UseFilters,
  HttpException,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDTO } from '../dto/user.dto';
import { HttpExceptionFilter } from '../validator/validator.validator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/postUser')
  @UseFilters(HttpExceptionFilter)
  async postUser(@Res() res, @Body() userDTO: UserDTO) {
    if (!userDTO.name || !userDTO.email) {
      throw new HttpException('Name already exists.', HttpStatus.BAD_REQUEST);
    }
    const result = await this.userService.postUser(userDTO);
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully.',
      result,
    });
  }
}

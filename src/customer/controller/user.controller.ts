import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  UseFilters,
  HttpException,
  Get,
  Param,
  Put,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDTO } from '../dto/user.dto';
import { HttpExceptionFilter } from '../validator/validator.validator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // create a new user
  @Post('/postUser')
  @UseFilters(HttpExceptionFilter)
  async postUser(@Res() res, @Body() userDTO: UserDTO) {
    if (!userDTO.name || !userDTO.email || !userDTO.displayName) {
      throw new HttpException('Name already exists.', HttpStatus.BAD_REQUEST);
    }
    const result = await this.userService.postUser(userDTO);
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully.',
      result,
    });
  }

  // validate email
  @Get('/validateEmail/:emailUser')
  async validateEmail(@Res() res, @Param('emailUser') emailUser) {
    const result = await this.userService.validateEmail(emailUser);
    if (!result) {
      return res.status(HttpStatus.OK).json();
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Email already exists.' });
  }

  // update user
  @Put('/putUser')
  @UseFilters(HttpExceptionFilter)
  async putUser(@Res() res, @Query('userId') userId, @Body() userDTO: UserDTO) {
    const result = await this.userService.updateUser(userId, userDTO);
    if (!result) {
      throw new NotFoundException('User does not exist');
    }
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      result,
    });
  }
}

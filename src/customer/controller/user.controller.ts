import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  UseFilters,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDTO } from '../dto/user.dto';
import { HttpExceptionFilter } from '../validator/validator.validator';
import { RolesGuard } from '../guard/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // create a new user
  @Post('/postUser')
  @UseFilters(HttpExceptionFilter)
  @UseGuards(RolesGuard)
  async postUser(@Res() res, @Body() userDTO: UserDTO) {
    const result = await this.userService.postUser(userDTO);
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully.',
      result,
    });
  }

  // validate email
  @Get('/validateEmail/:emailUser')
  @UseGuards(RolesGuard)
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
  @UseGuards(RolesGuard)
  async putUser(@Res() res, @Query('userId') userId, @Body() userDTO: UserDTO) {
    const result = await this.userService.updateUser(userId, userDTO);
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      result,
    });
  }

  // delete user
  @Delete('deleteUser')
  @UseGuards(RolesGuard)
  async deleteUser(@Res() res, @Query('idUser') idUser) {
    const result = await this.userService.deleteUser(idUser);
    if (!result) {
      throw new NotFoundException('User does note exits.');
    }
    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted',
    });
  }
}

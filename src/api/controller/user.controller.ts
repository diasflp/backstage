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
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDTO } from '../dto/user.dto';
import { HttpExceptionFilter } from '../validator/validator.validator';
import { RolesGuard } from '../guard/roles.guard';
import { createJwt } from '../constants/jwt.constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // create a new user
  @Post('/postUser')
  @UseFilters(HttpExceptionFilter)
  async postUser(@Res() res, @Body() userDTO: UserDTO) {
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
  @UseGuards(RolesGuard)
  async putUser(
    @Res() res,
    @Req() req,
    @Query('userId') userId,
    @Body() userDTO: UserDTO,
  ) {
    const token = createJwt(req);
    const result = await this.userService.updateUser(userId, userDTO);
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      token,
      result,
    });
  }

  // delete user
  @Delete('deleteUser')
  @UseGuards(RolesGuard)
  async deleteUser(@Res() res, @Req() req, @Query('idUser') idUser) {
    const token = createJwt(req);
    await this.userService.deleteUser(idUser);
    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted',
      token,
    });
  }
}

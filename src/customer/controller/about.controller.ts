import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  HttpStatus,
  Param,
  NotFoundException,
  HttpException,
  UseFilters,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { AboutService } from '../services/about.service';
import { AboutDTO } from '../dto/about.dto';
import { HttpExceptionFilter } from '../validator/validator.validator';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  // Post a new about
  @Post('/postAbout')
  @UseFilters(HttpExceptionFilter)
  async postAbout(@Res() res, @Body() aboutDTO: AboutDTO) {
    if (!aboutDTO.description) {
      throw new HttpException('About already exists.', HttpStatus.BAD_REQUEST);
    }
    const result = await this.aboutService.postAbout(aboutDTO);
    return res.status(HttpStatus.OK).json({
      message: 'About has been created successfully.',
      result,
    });
  }

  // Get all About
  @Get('/getAllAbout')
  async getAllAbout(@Res() res) {
    const result = await this.aboutService.getAllAbout();
    return res.status(HttpStatus.OK).json(result);
  }

  // Get user about
  @Get('/getAboutUser/:idUser')
  async byIdUserAbout(@Res() res, @Param('idUser') idUser) {
    const result = await this.aboutService.getByIdUserAbout(idUser);
    if (!result) {
      throw new NotFoundException('not found!');
    }
    return res.status(HttpStatus.OK).json(result);
  }

  // Update about
  @Put('/putAbout')
  @UseFilters(HttpExceptionFilter)
  async putAbout(
    @Res() res,
    @Query('idDescription') idDescription,
    @Body() aboutDTO: AboutDTO,
  ) {
    const result = await this.aboutService.updateAbout(idDescription, aboutDTO);
    if (!result) {
      throw new NotFoundException('Description does not exist!');
    }

    return res.status(HttpStatus.OK).json({
      message: 'About has been successfully updated',
      result,
    });
  }

  // Delete about
  @Delete('/deleteAbout')
  async deleteAbout(@Res() res, @Query('idDescription') idDescription) {
    const result = this.aboutService.deleteAbout(idDescription);
    if (!result) {
      throw new NotFoundException('About does not exist');
    }
    return res.status(HttpStatus.OK).json({
      message: 'About has been deleted',
      result,
    });
  }
}

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
} from '@nestjs/common';
import { AboutService } from '../services/about.service';
import { AboutDTO } from '../dto/about.dto';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Post('/postAboutDescription')
  async postDescription(@Res() res, @Body() aboutDTO: AboutDTO) {
    try {
      const result = await this.aboutService.postDescription(aboutDTO);
      return res.status(HttpStatus.OK).json({
        message: 'Description has been created successfully.',
        result,
      });
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException(
          'Description already exists.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Description is not empty.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  @Get('getAllDescription')
  async getAllDescription(@Res() res) {
    const result = await this.aboutService.getAllDescription();
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('byIdDescription/:customerID')
  async byIdDescription(@Res() res, @Param('idDescription') idDescription) {
    const result = await this.aboutService.getByIdDescription(idDescription);
    if (!result) {
      throw new NotFoundException('not found!');
    }
    return res.status(HttpStatus.OK).json(result);
  }
}

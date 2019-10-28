import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  HttpStatus,
  Param,
  UseFilters,
  Query,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AboutService } from '../services/about.service';
import { AboutDTO } from '../dto/about.dto';
import { HttpExceptionFilter } from '../validator/validator.validator';
import { RolesGuard } from '../guard/roles.guard';
import { createJwt } from '../constants/jwt.constants';

@Controller('about')
@UseGuards(RolesGuard)
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  // Post a new about
  @Post('/postAbout')
  @UseFilters(HttpExceptionFilter)
  async postAbout(@Res() res, @Req() req, @Body() aboutDTO: AboutDTO) {
    const token = createJwt(req);
    const result = await this.aboutService.postAbout(aboutDTO);
    return res.status(HttpStatus.OK).json({
      message: 'About has been created successfully.',
      token,
      result,
    });
  }

  // Get all About
  @Get('/getAllAbout')
  @UseGuards(RolesGuard)
  async getAllAbout(@Res() res, @Req() req) {
    const token = createJwt(req);
    const result = await this.aboutService.getAllAbout();
    return res.status(HttpStatus.OK).json({ result, token });
  }

  // Get user about
  @Get('/getAboutUser/:idUser')
  @UseGuards(RolesGuard)
  async byIdUserAbout(@Res() res, @Req() req, @Param('idUser') idUser) {
    const token = createJwt(req);
    const result = await this.aboutService.getByIdUserAbout(idUser);
    return res.status(HttpStatus.OK).json({ result, token });
  }

  // Update about
  @Put('/putAbout')
  @UseFilters(HttpExceptionFilter)
  @UseGuards(RolesGuard)
  async putAbout(
    @Res() res,
    @Req() req,
    @Query('idDescription') idDescription,
    @Body() aboutDTO: AboutDTO,
  ) {
    const token = createJwt(req);
    const result = await this.aboutService.updateAbout(idDescription, aboutDTO);
    return res.status(HttpStatus.OK).json({
      message: 'About has been successfully updated.',
      token,
      result,
    });
  }

  // Delete about
  @Delete('/deleteAbout')
  @UseGuards(RolesGuard)
  async deleteAbout(
    @Res() res,
    @Req() req,
    @Query('idDescription') idDescription,
  ) {
    const token = createJwt(req);
    await this.aboutService.deleteAbout(idDescription);
    return res.status(HttpStatus.OK).json({
      token,
      message: 'About has been deleted.',
    });
  }
}

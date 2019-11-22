import {
  Controller,
  UseGuards,
  Res,
  Req,
  Body,
  HttpStatus,
  Post,
  UseFilters,
  Get,
  Param,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { RolesGuard } from '../guard/roles.guard';
import { CommentsService } from '../services/comments.service';
import { CommentsDTO } from '../dto/comments.dto';
import { createJwt } from '../constants/jwt.constants';
import { HttpExceptionFilter } from '../validator/validator.validator';

@Controller('comments')
@UseGuards(RolesGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  //  post a new comments
  @Post('/postComments')
  @UseFilters(HttpExceptionFilter)
  async postComments(@Res() res, @Req() req, @Body() commentsDTO: CommentsDTO) {
    const token = createJwt(req);
    const result = await this.commentsService.postComments(commentsDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Comments has been created successfully',
      token,
      result,
    });
  }

  // get all comments
  @Get('/getAllComments')
  @UseGuards(RolesGuard)
  async getAllComments(
    @Res() res,
    @Req() req,
    @Param('page') page,
    @Param('size') size,
  ) {
    const token = createJwt(req);
    const result = await this.commentsService.getAllComments(page, size);
    return res.status(HttpStatus.OK).json({ result, token });
  }

  // get user comments
  @Get('/getUserComment/:idUser')
  @UseGuards(RolesGuard)
  async byIdUserComments(@Res() res, @Req() req, @Param('idUser') idUser) {
    const token = createJwt(req);
    const result = await this.commentsService.getByIdUserComments(idUser);
    return res.status(HttpStatus.OK).json({ result, token });
  }

  // update comments
  @Put('putComment')
  @UseFilters(HttpExceptionFilter)
  @UseGuards(RolesGuard)
  async putComment(
    @Res() res,
    @Req() req,
    @Query('idComments') idComments,
    @Body() commentsDTO: CommentsDTO,
  ) {
    const token = createJwt(req);
    const result = await this.commentsService.updateComments(
      idComments,
      commentsDTO,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Comment has been succesfully updated',
      token,
      result,
    });
  }

  // delete comments
  @Delete('/deleteComment')
  @UseGuards(RolesGuard)
  async deletComments(@Res() res, @Req() req, @Query('idComments') idComments) {
    const token = createJwt(req);
    await this.commentsService.deleteComments(idComments);
    return res.status(HttpStatus.OK).json({
      token,
      message: 'Comment has been deleted.',
    });
  }
}

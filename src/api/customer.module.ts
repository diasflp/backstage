import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AboutController } from './controller/about.controller';
import { AboutService } from './services/about.service';
import { AboutSchema } from './schemas/about.schema';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';
import { UserController } from './controller/user.controller';
import { PassportModule } from '@nestjs/passport';
import { CommentsSchema } from './schemas/comments.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'About', schema: AboutSchema },
      { name: 'Comments', schema: CommentsSchema },
    ]),
  ],
  exports: [UserService],
  controllers: [AboutController, UserController],
  providers: [AboutService, UserService],
})
export class CustomerModule {}

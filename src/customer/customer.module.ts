import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AboutController } from './controller/about.controller';
import { AboutService } from './services/about.service';
import { AboutSchema } from './schemas/about.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customer', schema: AboutSchema }]),
  ],
  controllers: [AboutController],
  providers: [AboutService],
})
export class CustomerModule {}

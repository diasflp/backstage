import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './customer/customer.module';
import { environment } from './environment';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://dias:${
        environment.senhaDB
      }@cluster0-tol24.mongodb.net/backStage?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useCreateIndex: true },
    ),
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

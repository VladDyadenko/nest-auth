import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.DB_HOST}`),
    AuthModule,
    UserModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService, CommentService],
})
export class AppModule {}

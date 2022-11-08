import { Module } from '@nestjs/common';
import {SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/model/user.model';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PostService } from './post/post.service';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { Post } from './post/model/post.model';


@Module({
  imports: [UserModule,
  SequelizeModule.forRoot({
    dialect: 'mysql',
    host: '127.0.0.1',
    port:3307,
    username: 'root',
    password: '123',
    database: 'myblog',
    models: [User,Post],
    synchronize:true,
    autoLoadModels: true

  }),
  AuthModule,
  PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';


@Module({
  imports: [UserModule,
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port:3307,
    username: 'root',
    password: '123',
    database: 'myblog',
    entities: [User],
    synchronize:true

  }),
  AuthModule,
  ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

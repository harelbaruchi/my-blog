import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {SequelizeModule} from '@nestjs/sequelize'
import { User } from './model/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService] ,
    exports: [UserService]
})
export class UserModule {

}

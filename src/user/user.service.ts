import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import {Sequelize} from 'sequelize-typescript'
import {InjectModel} from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { User } from './model/user.model';

@Injectable()
export class UserService {

    constructor( 
       @InjectModel(User)
       private userModel: typeof User
        ){}
    getUsers(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async create(createUserDto: CreateUserDto|any){
        return await this.userModel.create(createUserDto)
    }

    update(updateUserDto: UpdateUserDto, userId: number){
        User.update(updateUserDto,{where: {id: userId}}).then(()=>{
            message: "user updated successfully"
        })
    }

    getUser(id:number): Promise<User>{
        return this.userModel.findOne({where: {id}})
    }

    findByEmail(email: string){
        return this.userModel.findOne({where: {email}})
    }

    async delete(userId: number){
        const user= await this.getUser(userId)
        await user.destroy();
    }




}

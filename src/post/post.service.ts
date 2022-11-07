import { Injectable } from '@nestjs/common';
import { Post } from './model/post.model';
import {InjectModel} from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {

    constructor( 
        @InjectModel(Post)
    private postModel: typeof Post
    ){}

    getPosts(postId?:number ): Promise<Post[]|Post>{
        if(postId){
            return this.postModel.findOne({where:{id:postId}})
        }
        return this.postModel.findAll({limit: 10, order: [['updatedAt','DESC']]});
    }

    async create(createPostDto: CreatePostDto| any){
        return await this.postModel.create(createPostDto)
    }

    update(updatePostDto: UpdatePostDto,postId: number){
        Post.update(updatePostDto,{where:{id: postId}}).then(()=>{
            return "post updated successfully"
        })
    }

    async delete(postId: number){
        const post: any= await this.getPosts(postId)
        await post.destroy()
    }

    findByAuthor(authorId: number){
         return this.postModel.findAll({where:{
            authorId
         },
        limit: 10, order:[['updatedAt','DESC']]});
    }
   
}

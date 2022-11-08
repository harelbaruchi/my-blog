import { Injectable } from '@nestjs/common';
import { Post } from './model/post.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetQueryParams } from './post-types';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
  ) {}

  /**
   * Generic function that can handle a verity of get requests
   * 
   */
  getPosts<T extends GetQueryParams>(params: T): Promise<Post[] | Post> {
    if (params.postId) {
      return this.postModel.findOne({ where: { id: params.postId } });
    }
        if ('authorId' in params) {
           if (params.isAsc && params.take) {
         
            const query: any= this._getQueryObject(params)
            console.log(query)
            return this.postModel.findAll(query)
         }
         return this.postModel.findAll({ where: { authorId: params.authorId } });
         }

   else if (params.take && params.isAsc) {
        const query: any= this._getQueryObject(params)
        console.log(query)
        return this.postModel.findAll(query)
    }
    
  }

  async create(createPostDto: CreatePostDto | any) {
    return await this.postModel.create(createPostDto);
  }

  update(updatePostDto: UpdatePostDto, postId: number) {
    Post.update(updatePostDto, { where: { id: postId } }).then(() => {
      return 'post updated successfully';
    });
  }

  async delete(postId: number) {
    const post: any = await this.getPosts({ postId });
    await post.destroy();
  }

  async findByAuthor(params: GetQueryParams): Promise<Post[]> {
    return await this.getPosts(params).then((response:Post[])=>{
        return response;
    })
  }

  private _getQueryObject(params: GetQueryParams){
    if('authorId' in params){ //if its find by user
        if((params.isAsc.toString()==='false')&&params.take){
            const query= {
                where: { authorId: params.authorId },
                offset: params.take*1,
                limit: 10,
                order: [['updatedAt', 'DESC']],
              }
              return query;
        } 
         if((params.isAsc.toString()==='true')&&params.take){
            const query= {
                where: {authorId: params.authorId},
                offset: params.take*1,
                limit: 10,
                order:[['updatedAt','ASC']]
            }
            return query;
        }
    }
    //if its a regular get request
    else if((params.isAsc.toString()==='false')&&params.take){
        const query= {
            offset: params.take*1,
            limit: 10,
            order: [['updatedAt', 'DESC']],
          }
          return query;
    } 
    if((params.isAsc.toString()==='true')&&params.take){ 
        const query= {
        offset: params.take*1,
        limit: 10,
        order: [['updatedAt', 'ASC']],
      }
      return query;
    }
    return ` found ${params}`
   
  }
}

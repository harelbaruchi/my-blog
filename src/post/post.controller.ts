import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';


@Controller('post')
export class PostController {
    constructor(private postService: PostService){}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getPosts(){
       return this.postService.getPosts();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    store(@Body() createPostDto: CreatePostDto){
        return this.postService.create(createPostDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/:postId')
    update(
        @Body() updatePostDto: UpdatePostDto,
        @Param() param: {postId: number}
    ){
        return this.postService.update(updatePostDto, param.postId)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:postId')
    getPost(@Param() param: {postId: number}){
        return this.postService.getPosts(param.postId)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/userId/:authorId')
    getPostByAuthor(@Param() param: {authorId: number}){
        return this.postService.findByAuthor(param.authorId)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:postId')
    deletePost(@Param() param: {postId:number }){
        return this.postService.delete(param.postId)
    }
}



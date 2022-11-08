import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getPosts(@Param() params: { },@Query('take') take?: number, @Query('isAsc') isAsc?: boolean) {
    Object.assign(params,{take, isAsc})
    console.log(params)
    return this.postService.getPosts(params);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  store(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:postId')
  update(
    @Body() updatePostDto: UpdatePostDto,
    @Param() param: { postId: number },
  ) {
    return this.postService.update(updatePostDto, param.postId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:postId')
  getPost(@Param() params: { postId: number }) {
    return this.postService.getPosts(params);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/userId/:authorId')
  getPostByAuthor(
    @Param() params: { authorId: number },@Query('take') take?: number, @Query('isAsc') isAsc?: boolean) {
      Object.assign(params,{take, isAsc})
      console.log(params)
    return this.postService.findByAuthor(params);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:postId')
  deletePost(@Param() params: {  postId: number }) {
    return this.postService.delete(params.postId);
  }

}

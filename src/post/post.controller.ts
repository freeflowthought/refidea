import {Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import {PostService} from './post.service'
import {createPostDto} from './dto/create-post.dto'

@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(private postService:PostService){}

  //get all the posts of this userID
  @Get()
  getUserPosts(@GetUser('id') userId:number){
      return this.postService.getPosts(userId)
  }

  //get the specific post by this userID
  @Get(':id')
  getUserPostById(@GetUser('id') userId:number,@Param('id',ParseIntPipe) postId:number){
      return this.postService.getUserPostById(userId,postId)
  }

  //create the post under specific userId
  @Post()
  createPost(@GetUser('id') userId:number,@Body() dto:createPostDto){
     return this.postService.createPost(userId,dto,);
  }

}

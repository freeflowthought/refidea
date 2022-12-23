import {Body,
  Controller,
  Delete,
  Get,
  Req,
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
import { editPostDto } from './dto';
import { Request } from 'express';
import { Status } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(private postService:PostService){}

  @Get('/all')
  getAllPosts(){
    return this.postService.getAllPosts()
  }

  //user route
  @Get()
  getUserPosts(@GetUser('id') userId:number){
      return this.postService.getPosts(userId)
  }

  //get the specific post
  //this function is buggy
  @Get(':id')
  getUserPostById(@Param('id',ParseIntPipe) postId:number){
      return this.postService.getUserPostById(postId)
  }

  



  //create the post under specific userId
  @Post()
  createPost(@GetUser('id') userId:number,@Body() dto:createPostDto){
     return this.postService.createPost(userId,dto,);
  }

  //edit specific post 
  @Patch(':id')
  editPost(@GetUser(':id') userId:number,@Param('id',ParseIntPipe) postId:number,@Body() dto:editPostDto){
      return this.postService.editPost(userId,postId,dto,)
  }



  //get all the applications under the post
  //  posts/5/applications

  //Test Fails on this controller as well
  @Get(':id/applications')
  getApplicationByPost(@Param('id',ParseIntPipe) postId:number){
    let applications = this.postService.findAllAppsByPost(postId)
    return applications
  }

  //get all the rejected applications under the post
  //  posts/5/rejected
  @Get(':id/:status')
  filterAppsStatus(@Param('id',ParseIntPipe) postId:number,@Param('status') status:Status){
     //handling the extra case for the status is not one of the status
     return this.postService.filterAppsStatus(postId,status)
  }







}

import {Body,
  Controller,
  Delete,
  Get,
  Req,
  HttpCode,
  HttpStatus,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,} from '@nestjs/common';
import {User} from '@prisma/client'
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import {PostService} from './post.service'
import { createPostDto,editPostDto, filterStatusDto, createAppDto} from './dto';
import { Request } from 'express';
import { Status } from '@prisma/client';
import {Application} from '@prisma/client';

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
  getUserPosts(@GetUser('id') user:User){
      return this.postService.getPosts(user.id)
  }

  //get the specific post
  //this function is buggy
  @Get(':id')
  async getUserPostById(@Param('id',ParseIntPipe) postId:number){
      let post = await this.postService.getUserPostById(postId)
      if (!post){
          throw new HttpException('Not Found PostId', HttpStatus.NOT_FOUND)
      }
      return post
  }

  



  //create the post under specific userId
  @Post()
  createPost(@GetUser() user:User,@Body() dto:createPostDto){
     return this.postService.createPost(user.id,dto,);
  }

  //edit specific post 
  @Patch(':id')
  editPost(@GetUser() user:User,@Param('id',ParseIntPipe) postId:number,@Body() dto:editPostDto){
      return this.postService.editPost(user.id,postId,dto,)
  }


//create an application under specific post
@Post(':id/applications')
async createApplicationForPost(@GetUser() user:User, @Param('id',ParseIntPipe) postId:number,@Body() dto:createAppDto): Promise<{message:string, data:Application}> {
  return await this.postService.createApplication(user.id, postId,dto);   
}

  //get all the applications under the post
  //  posts/5/applications
  @Get(':id/applications')
  getApplicationByPost(@Param('id',ParseIntPipe) postId:number){
    let applications = this.postService.findAllAppsByPost(postId)
    return applications
  }

  //get all the rejected applications under the post
  //  posts/5/status/rejected
  @Get(':id/status/:status')
  async filterAppsStatus(@Param('id',ParseIntPipe) postId:number,@Param('status') status:filterStatusDto["status"]){
     //need to find a way to deal with the wrong input such as posts/5/rejected
     let post = await this.postService.getUserPostById(postId)
      if (!post){
          throw new HttpException('Not Found PostId', HttpStatus.NOT_FOUND)
      }
     return this.postService.filterAppsStatus(postId,status)
  }







}

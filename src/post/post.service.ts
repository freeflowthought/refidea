import { Injectable,ForbiddenException,ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { profile } from 'console';
import { appendFile } from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPostDto,editPostDto, filterStatusDto,createAppDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaError } from 'src/utils/prismaError';
import { PostNotFoundException } from './exceptions/postNotFound.exception';
import { Application, Post } from '@prisma/client';
@Injectable()
export class PostService {
  constructor(private prisma: PrismaService){}

  async getAllPosts(){
    return await this.prisma.post.findMany()
  }

  async getPosts(userId:number){
    return await this.prisma.post.findMany({
      where:{
        userId,
      },
    });
  }

  async getUserPostById(postId:number):Promise<Post>
  {
    const post = await this.prisma.post.findUnique({
      where: {
        id:postId
      }
  });
  return post;

}

async createPost(userId:number,dto:createPostDto){
  const post = await this.prisma.post.create({
    data:{
      userId,
      ...dto,
    },
  });

  return post
}

//edit post by this userID
async editPost(userId:number,postId:number,dto:editPostDto){
     const post = await this.prisma.post.findUnique({
        where:{
          id:postId,
        }
     });
     //check if the user owns the post
     if(!post || post.userId != userId){
      throw new ForbiddenException(
        'Access to resources denied',
      );
     }

     //check if the post has already had the application, if it has already had the application, then throw forbidden Exception

     return this.prisma.post.update({
      where:{
         id:postId,
      },
      data:{
        ...dto,
      },
     });
}


async createApplication(userId:number, postId:number, dto: createAppDto): Promise<{message:string, data:Application}> {
  //1: with this postId, we should be able to find the post.
  //thinking of refactoring the code in here, the post should be other restful service, 
  //so we need a separate logic to maintain
  try{
    const post = await this.prisma.post.findUnique({
      where:{
        id:postId
      }
    })
  
    //TODO: we also need to add the business application logic to ensure that someone who posted the post and 
    //he can not apply the post that he posted by himself.  I need to make the changes on the model to make
    //this logic to be much more clear
    if (!post){
      throw new ForbiddenException(
        'the post is not exists',
      );
    }
  
    //2: if the user has already made the application to the post, then throw a forbidden error as he can't make duplicate applications
   const application = await this.prisma.application.findMany({
      where:{
        postId:postId,
        userId:userId
      }
    })
    console.log(application)
    if (application.length > 0) {
      throw new ConflictException('You have already applied to this post');
    }
  
  
    
    const newApplication = await this.prisma.application.create({
      data: {
        userId,
        postId,
        ...dto,
  
      },
    })
  
    return {
      message: 'Application created successfully',
      data: newApplication,
    };

  }catch(error){
    console.log(error)
    //return an appropriate error message to the client
    if (error instanceof ForbiddenException){
      throw new HttpException(error.message,HttpStatus.FORBIDDEN);
    }
    else if (error instanceof ConflictException){
      throw new HttpException(error.message,HttpStatus.CONFLICT)
    } else {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  



}


//temporary making the decison to write the application logic to find all the applications from the post service module
async findAllApps(postId:number){
  // what needs to be done: to combine with the profile table use of the join
  const post = await this.prisma.post.findUnique({
    where: {
      id: postId
    },
    include:{
      Application: {
        include: {
          user: {
            include: {
              Profile: true
            }
          }
        }
      }
    }
  })
  //get all the applications
  return post.Application
     //return joined object of profiles and applications
    
}

//temporary making the decison to write the application logic from post service to find all the applications for specific post
async findAllAppsByPost(postId:number){
  // I should only filter the one who has the profile
  const app = await this.prisma.application.findMany({
    where:{
      postId:postId,
    },
    select: {
       interest:true,
       postId:true,
       userId:true,
       status:true,
       user:{
        select:{
          useremail:true,
          Profile: {
            select:{
              introduction:true
            }
          }
        }
       }
    }
  })
  console.log(app)
  //this is not the best way to solve the problem as the for loop is very inefficient to do the querying.
  //refactor this part later
  let filteredApp = []
  for (var i = 0; i < app.length;i++){
    var object = app[i];
    for (var property in object){
      if (property == 'user' && object[property].Profile != null){
        filteredApp.push(object)
      }
    }
  }

  return filteredApp


    
  
}

async filterAppsStatus(postId:number,statusDto:filterStatusDto["status"]){
  const app = await this.prisma.application.findMany({
    where:{
      postId:postId,
      status:statusDto,
    },
    select: {
       interest:true,
       postId:true,
       userId:true,
       status:true,

       user:{
        select:{
          useremail:true,
          Profile: {
            select:{
              introduction:true,
            }
          }
        }
       }
    }
  })

  let filteredApp = []
  for (var i = 0; i < app.length;i++){
    var object = app[i];
    for (var property in object){
      if (property == 'user' && object[property].Profile != null){
        filteredApp.push(object)
      }
    }
  }

  return filteredApp
}




}

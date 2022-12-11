import { Injectable,ForbiddenException } from '@nestjs/common';
import { profile } from 'console';
import { appendFile } from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPostDto,editPostDto, filterStatusDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaError } from 'src/utils/prismaError';
import { PostNotFoundException } from './exceptions/postNotFound.exception';
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

  async getUserPostById(postId:number)
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
      user: {
        Profile: {
          some: {}
        }
       }
    },
    include: {
       user:{
        include:{
          Profile: {
            select:{
              introduction:true
            }
          }
        }
       }
    }
  })

return app
    
  
}

async filterAppsStatus(postId:number,status){
  const app = await this.prisma.application.findMany({
    where:{
      postId:postId,
      status:status,
      user: {
        Profile: {
          some: {}
        }
       }
    },
    include: {
       user:{
        include:{
          Profile: {
            select:{
              introduction:true
            }
          }
        }
       }
    }
  })
}




}

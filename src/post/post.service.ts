import { Injectable,ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPostDto,editPostDto } from './dto';


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

  async getUserPostById(userId:number,id:number)
  {
    return await this.prisma.post.findFirst({
      where: {
        id,
        userId,
      },
  });

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

     return this.prisma.post.update({
      where:{
         id:postId,
      },
      data:{
        ...dto,
      },
     });
}


//below are the confusion
//get all the applications under the post, (with this, I then need to retrieve all the applicaion with accepted status)

//get all the posts sent to other user's profile


}

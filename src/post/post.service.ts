import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPostDto } from './dto';


@Injectable()
export class PostService {
  constructor(private prisma: PrismaService){}

  async getPosts(userId:number){
    return await this.prisma.post.findMany({
      where:{
        userId,
      },
    });
  }

  async getUserPostById(userId:number,postId:number)
  {
    return await this.prisma.post.findFirst({
      where: {
        postID:postId,
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


}

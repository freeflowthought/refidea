import { Injectable,ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createAppDto } from './dto';
import { editAppsDto } from './dto/edit-app.dto';

@Injectable()
export class AppsService {
  constructor(private prisma: PrismaService){
  }

  async getMyapps(userId:number){
     return await this.prisma.application.findMany({
      where:{
        userId: userId
      },
     })
  }

  async createApplication(userId:number, postId:number, dto: createAppDto) {
    //1: with this postId, we should be able to find the post
    const post = await this.prisma.post.findUnique({
      where:{
        id:postId
      }
    })
    if (!post){
      throw new ForbiddenException(
        'Access to resources denied',
      );
    }

    //2: if the user has already made the application to the post, then throw a forbidden error as he can't make duplicate applications
   const application = await this.prisma.application.findMany({
      where:{
        postId:postId,
        userId:userId
      }
    })

    if(application){
      throw new ForbiddenException(
        'Access to resources denied',
      );
    }


    
    return await this.prisma.application.create({
      data: {
        userId,
        postId,
        ...dto,
  
      },
    })



}


  //get App by appId
  async setAppStatus(appId:number,dto:editAppsDto,userId:number){
    //get the appId's belated postId
    const postId = await this.prisma.application.findUnique({
      where:{
        id:appId
      },
       select:{
        postId:true
       }
    })

    console.log(postId)
    //find the userId for this post Id
    const mtchUser = await this.prisma.post.findUnique({
      where:{
        id:postId.postId
      },
      select:{
        userId: true
      }
    })

    console.log(mtchUser)
    if (mtchUser.userId != userId){
       throw new ForbiddenException('Access denied, you have no authority')
    }else{
      //edit the application status section
      let updatedApplication = await this.prisma.application.update({
        where:{
          id: appId
        },
        data:{
          ...dto,
        }
      })
      console.log(updatedApplication)


    }



  }

  //we don't want to allow user to delete or edit his application

}
import { Injectable,ForbiddenException,ConflictException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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


  //below function should set up the status for application. only the poster has the authority to set up.
  async setAppStatus(appId:number,userId:number,dto:editAppsDto){
    
    console.log("appId is: " + appId)
    console.log("logined in userID is: " + userId)
    console.log("dto is:  "+ dto)
    
    //get the appId's belated postId
    const postId = await this.prisma.application.findUnique({
      where:{
        id:appId
      },
       select:{
        postId:true
       }
    })
    
    console.log("postId is: " + postId.postId)
    
    //find the userId for this post Id
    const mtchUser = await this.prisma.post.findUnique({
      where:{
        id:postId.postId
      },
      select:{
        userId: true
      }
    })

    console.log("mtchUserID:" + mtchUser.userId)
    if (mtchUser.userId != userId){
       throw new ForbiddenException('Access denied, you have no authority')
    }else{

      //edit the application status section, this update command is not successful
      let updatedApplication = await this.prisma.application.update({
        where:{
          id: appId
        },
        data:{
          ...dto,
        }
      })
      console.log(updatedApplication)
      //console.log(dto)
      //console.log({...dto})
      return updatedApplication


    }



  }

  //we don't want to allow user to delete or edit his application

}
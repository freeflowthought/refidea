import { Injectable,ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppsService {
  constructor(private prsima: PrismaService){
  }

  async getMyapps(userId:number){
     return await this.prsima.application.findMany({
      where:{
        userId: userId
      },
     })
  }

  async createApplication(userId:number, postId:number, interest:string) {
    //1: if the user has already made the application to the post, then throw a forbidden error
   const application = await this.prsima.application.findMany({
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


    return await this.prsima.application.create({
      data: {
        userId:userId,
        postId:postId,
        interest:interest
      }
    })
  }

  //we don't want to allow user to delete or edit his application

}

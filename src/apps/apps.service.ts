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
    return await this.prsima.application.create({
      data: {
        userId:userId,
        postId:postId,
        interest:interest
      }
    })
  }

}

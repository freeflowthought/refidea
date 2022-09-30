import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaError } from 'src/utils/prismaError';
import { createProfileDto } from './dto';


// this Injectable means that the whole service canbe used as the dependency injection
@Injectable()
export class ProfileService {
    constructor(private prismaService: PrismaService){

    }

    //user should be able to access their profile



    //user should be able to create their profile
    async createProfile(userId:number,dto:createProfileDto){
       const profile = await this.prismaService.profile.create({
        data:{
            userId,
            ...dto,
        },
       })
       return profile
    }

     


    //user should be able to delete their profile

}

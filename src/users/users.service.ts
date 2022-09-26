import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserNotFoundException } from './exceptions/userNotFound.exception';



@Injectable()
export class UsersService {
  constructor(public prisma:PrismaService){}

  async findOne(userId:number): Promise<User> {
    
    const user = await this.prisma.user.findUnique({
      where: {id:userId}
    })
    if(!user){
      throw new UserNotFoundException();
    }

    return user

  }
}

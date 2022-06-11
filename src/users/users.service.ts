import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class UsersService {
  constructor(public prisma:PrismaService){}

  async findOne(userId:number): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {id:userId}
    })

  }
}

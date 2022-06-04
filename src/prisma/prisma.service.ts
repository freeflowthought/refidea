import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(){
    super({
      datasources:{
        db:{
          url:'postgresql://postgres:w123456@localhost:5432/mydb?schema=public'
        }
      }
    })
  }
}

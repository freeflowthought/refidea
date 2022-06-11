import { Controller, Get, Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUser } from 'src/auth/decorator';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService){}

  @Get(':id')
 async getUserById(@Param('id',ParseIntPipe) userId:number):Promise<string>{
    let data = await this.userService.findOne(userId)
    return `The User ${userId} has the email: ${data.useremail}`

   
  }




}

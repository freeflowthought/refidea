import {Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { AppsService } from './apps.service';

@UseGuards(JwtGuard)
@Controller('apps')
export class AppsController {

  constructor(private appService: AppsService){

  }

  @Get(':id')
  getMyApps(@GetUser('id') userId:number){
     return this.appService.getMyapps(userId)
  }

  //Create an application to a post
  @Post('create/:postid')
  createApplicationForPost(@GetUser() user:User, @Param('postid',ParseIntPipe) postId:number) {
    return this.appService.createApplication(user.id, postId, "Because I like money");   
  }

}

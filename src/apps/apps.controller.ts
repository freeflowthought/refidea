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
import { createAppDto } from './dto';

@UseGuards(JwtGuard)
@Controller('apps')
export class AppsController {

  constructor(private appService: AppsService){

  }

  @Get('')
  getMyApps(@GetUser() user:User){
     return this.appService.getMyapps(user.id)
  }

  //Create an application to a post
  @Post('create/:postid')
  createApplicationForPost(@GetUser() user:User, @Param('postid',ParseIntPipe) postId:number,dto:createAppDto) {
    return this.appService.createApplication(user.id, postId,dto);   
  }

}

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
import {editAppsDto} from './dto';

@UseGuards(JwtGuard)
@Controller('apps')
export class AppsController {

  constructor(private appService: AppsService){

  }

  @Get('')
  getMyApps(@GetUser() user:User){
     return this.appService.getMyapps(user.id)
  }

  @Patch(':id')
  setStatus(@Param('id',ParseIntPipe) appId:number,@GetUser() user:User,@Body() dto:editAppsDto){
    console.log("controller dto is" + dto)
    return this.appService.setAppStatus(appId,user.id,dto,);
  }

}

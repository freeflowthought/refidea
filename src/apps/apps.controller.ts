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
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { AppsService } from './apps.service';

@UseGuards(JwtGuard)
@Controller('apps')
export class AppsController {

  constructor(private appService: AppsService){

  }

  @Get('my')
  getMyApps(@GetUser('id') userId:number){
     return this.appService.getMyapps(userId)
  }


}

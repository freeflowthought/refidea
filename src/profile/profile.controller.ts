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
import { createProfileDto, editProfileDto } from './dto';
import { ProfileService } from './profile.service';

@UseGuards(JwtGuard)
@Controller('profile')
export class ProfileController {
    constructor(private profileService:ProfileService){}

    @Post()
    createProfile(@GetUser('id') userId:number,@Body() dto:createProfileDto ){
         return this.profileService.createProfile(userId,dto,);
    }

    @Patch()
    editProfile(@GetUser('id') userId:number,@Body() dto:editProfileDto){
        return this.profileService.editProfile(userId,dto,)
    }

    @Get('')
    getProfile(@GetUser('id') userId:number){
        return this.profileService.getProfile(userId)
    }


}

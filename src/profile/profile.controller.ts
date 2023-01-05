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
import {User} from '@prisma/client'
import { JwtGuard } from 'src/auth/guard';
import { createProfileDto, editProfileDto } from './dto';
import { ProfileService } from './profile.service';

@UseGuards(JwtGuard)
@Controller('profile')
export class ProfileController {
    constructor(private profileService:ProfileService){}

    @Post()
    createProfile(@GetUser() user:User,@Body() dto:createProfileDto ){
         return this.profileService.createProfile(user.id,dto,);
    }

    @Patch()
    editProfile(@GetUser() user:User,@Body() dto:editProfileDto){
        return this.profileService.editProfile(user.id,dto,)
    }

    @Get('')
    getProfile(@GetUser() user:User){
        return this.profileService.getProfile(user.id)
    }


}

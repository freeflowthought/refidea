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
import { OffersService } from './offers.service';

@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {

    constructor(private offerService: OffersService){}
    
    //create the offer
    @Post()
    async sendOffer(@GetUser() user:User, @Body() postId:number){
        return this.offerService.sendOffer(user.id,postId)
    }


    //getRecentOffers
    @Get(':recent')
    async getRecentOffers(@GetUser() user:User){
        return this.offerService.getRecentOffers(user.id)

    }

    //get Maximum Salary offered
    @Get("topSalary")
    async getTopOffer(@GetUser() user:User){
        return this.offerService.getTopSalary(user.id)
    }

    //get Top 5 Salary offers
    @Get("goodSalary")
    async getGoodOffer(@GetUser() user:User){

        let result  = this.offerService.getTop5Offers(user.id)
        return result
    }


}

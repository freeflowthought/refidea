import {Body,
    Controller,
    Delete,
    Get,
    Next,
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
    sendOffer(@GetUser() user:User, @Body() postId:number){
        return this.offerService.sendOffer(user.id,postId)
    }


    //getRecentOffers(), It looks like the problem has something to do with the middleware next
    @Get('/recent')
    getRecentOffers(@GetUser() user:User){
        return this.offerService.getRecentOffers(user.id)

    }
  

    //get Maximum Salary offered
    @Get('/topSalary')
    getTopOffer(@GetUser() user:User){
        return this.offerService.getTopSalary(user.id)
        
    }

    //get Top 5 Salary offers
    @Get('/goodSalary')
    getGoodOffer(@GetUser() user:User){

        return this.offerService.getTop5Offers(user.id)
    }
    


}

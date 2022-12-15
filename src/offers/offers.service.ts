import { Injectable,ForbiddenException } from '@nestjs/common';
import { networkInterfaces } from 'os';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class OffersService {
    constructor(private prisma: PrismaService){}

    async sendOffer(userId: number, postId:number){
        //we don't allow a postId to send the offer multiple time, so we firstly will query if the postId already exists or not
        let offer = await this.prisma.offer.findMany({
            where:{
                userId:userId,
                postId:postId
            }
        })
        if(offer){
            throw new ForbiddenException(
                'Access to resources denied',
              );
        }
        return await this.prisma.offer.create({
            data:{
              userId,
              postId,
            },
          });

    }


    //get the recent five days offer
    async getRecentOffers(userId:number){
        let offers = await this.prisma.offer.findMany({
            where:{
                userId,
                createDate:{
                    gte: subtractDays(5)
                }
                
                
            }
        })

        return offers
    }

    //get the maximum salary  - the test result shows there is a problem with this function
    async getTopSalary(userId:number){

        let offer = await this.prisma.offer.findMany({
            
            where:{
                userId,
            },
            
            include:{
                Post:{
                    select:{
                        salary:true
                      }
                }
            },
        })
        // Is this going to work or not?  I don't know
        let maxSalary = getMax(offer)
        return maxSalary

    }

    



}

function subtractDays(numOfDays, date = new Date()) {
    date.setDate(date.getDate() - numOfDays);
  
    return date;
  }


  function getMax(numArray){
    return Math.max.apply(null, numArray);
  }

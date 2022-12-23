import { Injectable,ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client'
import { editOfferDto } from './dto';


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
        //interesting to see that the syntax is not first
        let offer = await this.prisma.offer.findMany({
            
            where:{
                userId,
                NOT:{
                    Post:{
                        salary:null
                    }
                }
            },
            
            include:{
                Post:{
                    select:{
                        salary:true
                      }
                }
            },
            take:1,
            orderBy:{
                Post:{
                    salary:"desc"
                }
            }
        })
        
        return offer

    }

    async getTop5Offers(userId:number){
        //this query is not getting the result in which I need
        let result =  await this.prisma.$queryRaw(Prisma.sql`SELECT offers."pStatus",posts."postTitle",posts.id as post_Id,posts."createDate",posts.description,posts.category,posts.salary FROM public.offers left join public.posts ON posts.id = offers."postId" where offers."userId" = ${userId} and posts.salary is not null ORDER by posts.salary DESC LIMIT 5`)
        console.log(result)
        return result
    }

    //a function to set the offer status, we need to make sure that the person who has the authority to set the status for offer
    //the current authenticated userId needs to be the same userId on Offer table schema, the status needs to match with the pStatus enum
    async setOfferStatus(offerId:number, userId:number,dto:editOfferDto){

        const offer = await this.prisma.offer.findUnique({
            where:{
              id:offerId
            },
             select:{
              userId:true
             }
          })

          console.log(offer.userId)
          if (offer.userId != userId){
            throw new ForbiddenException('Access denied, you have no authority')
          }else{
            let updatedOffer = await this.prisma.offer.update({
                where:{
                  id: offerId
                },
                data:{
                  ...dto,
                }
              })

              console.log(updatedOffer)
              return updatedOffer

          }
       
    }

    async filterOfferStatus(userId:number,status){
        let offer = await this.prisma.offer.findMany({
            where:{
                userId:userId,
                pStatus:status
            }
        })
        return offer

    }




    



}

function subtractDays(numOfDays, date = new Date()) {
    date.setDate(date.getDate() - numOfDays);
  
    return date;
  }


  function getMax(numArray){
    return Math.max.apply(null, numArray);
  }

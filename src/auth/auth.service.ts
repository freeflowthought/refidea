import { ForbiddenException,Injectable } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private prisma:PrismaService,
    private config:ConfigService
    ) {}

  async signup(dto:AuthDto){
   // add the logic
   if(dto.password.length < 8){
    throw "ilegal password input"
   }
   
    //transfer the password to the hashedpassword
   
    const hash = await bcrypt.hash(dto.password,10) 
    //save it in the database
    try {
      const user = await this.prisma.user.create({
        data: {
          useremail: dto.email,
          password:hash,
        },
      });
      
    //return the saved user
    return user;
    }catch(error){
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
      throw error;

    }


  }

  async signin(dto:AuthDto){
     // find the user by email
     const user = this.prisma.user.findUnique({
       where: {
         useremail:dto.email,
       },
     })

     // if user does not exist throw exception
     if(!user)
     throw new ForbiddenException('Credential incorrect: user does not exists')

    // compare password, looks like this part is wrong
    const pwMatches = await bcrypt.compare(dto.password,(await user).password)

    // if password incorrect throw exception
    if (!pwMatches)
    throw new ForbiddenException(
      'Credentials incorrect',
    );
  //all the process here is to generate the jwt token
  return this.signToken((await user).id, (await user).useremail);
}

async signToken(
  Userid: number,
  useremail: string,
): Promise<{ access_token: string }> {
  const payload = {
    sub: Userid,
    useremail,
  };
  const secret = this.config.get('JWT_SECRET');

  const token = await this.jwt.signAsync(
    payload,
    {
      expiresIn: '15m',
      secret: secret,
    },
  );

  return {
    access_token: token,
  };
}

}
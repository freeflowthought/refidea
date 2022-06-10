import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {PassportModule} from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import {JwtStrategy} from './strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
    })
  ],
  providers: [AuthService,JwtStrategy],
  exports: [AuthService,JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

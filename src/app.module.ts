import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
      }),
    AuthModule,
     UsersModule, 
     PrismaModule, PostModule],

})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { AppsModule } from './apps/apps.module';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
      }),
    AuthModule,
     UsersModule, 
     PrismaModule, PostModule, AppsModule, ProfileModule],
})
export class AppModule {}

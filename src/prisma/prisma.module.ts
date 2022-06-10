import { Global,Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
//make it available globally
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}

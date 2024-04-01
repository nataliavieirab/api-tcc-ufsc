import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { AdminModule } from './modules/admin/admin.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AdminModule, PrismaModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [AdminModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}

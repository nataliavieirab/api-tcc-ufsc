import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { AdminModule } from './modules/admin/admin.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './modules/session/session.module';

@Module({
  imports: [AdminModule, PrismaModule, AuthModule, SessionModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}

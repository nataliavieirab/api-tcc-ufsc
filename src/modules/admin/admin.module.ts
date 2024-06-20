import { Module } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository';
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-user-repository';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { UsersController } from './user/users.controller';
import { OrganizationController } from './organization/organization.controller';
import { OrganizationRepository } from 'src/repositories/organization-repository';
import { PrismaOrganizationRepository } from 'src/repositories/prisma/prisma-organization-repository';
import { UserService } from 'src/services/domains/user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController, OrganizationController],
  providers: [
    PrismaService,
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: OrganizationRepository,
      useClass: PrismaOrganizationRepository,
    },
  ],
})
export class AdminModule {}

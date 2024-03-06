import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from '../users-repository';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { User, UserRole } from '@prisma/client';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(
    name: string,
    last_name: string,
    birth_date: number,
    cpf: string,
    password: string,
    user_name: string,
    roles: UserRole[],
  ): Promise<User> {
    return await this.prisma.user.create({
      data: {
        id: randomUUID(),
        name,
        last_name,
        birth_date,
        cpf,
        password,
        user_name,
        roles,
      },
    });
  }
}

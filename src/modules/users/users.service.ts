import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client';
import { CreateUserBody } from './dtos/create-user-body';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(CreateUserBody: CreateUserBody): Promise<User> {
    return this.prisma.user.create({ data: CreateUserBody });
  }
}

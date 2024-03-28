import { PrismaService } from 'src/database/prisma.service';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Prisma, User, UserRole } from '@prisma/client';
import { UsersRepository } from '../users-repository';
import { findUsersFilters } from 'src/modules/admin/dtos/users-dtos/find-users-filter';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(
    name: string,
    last_name: string,
    birth_date: Date,
    cpf: string,
    email: string,
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
        email,
        password,
        user_name,
        roles,
      },
    });
  }

  async findAllUsers(filters: findUsersFilters): Promise<User[]> {
    const { name, last_name, cpf, user_name, roles } = filters;

    const prismaFilters: Prisma.UserWhereInput = {
      name: name ? { contains: name } : undefined,
      last_name: last_name ? { contains: last_name } : undefined,
      cpf: cpf ? { equals: cpf } : undefined,
      user_name: user_name ? { equals: user_name } : undefined,
      roles: roles ? { hasSome: roles } : undefined,
    };

    return await this.prisma.user.findMany({
      where: prismaFilters,
    });
  }

  async findUserById(id: string): Promise<User | null> {
    const params = { where: { id } };

    return await this.prisma.user.findUnique(params);
  }

  async updateUser(
    id: string,
    name: string,
    last_name: string,
    birth_date: Date,
    cpf: string,
    email: string,
    password: string,
    user_name: string,
    roles: UserRole[],
  ): Promise<User | null> {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      return null;
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name,
        last_name,
        birth_date,
        cpf,
        password,
        user_name,
        roles,
      },
    });

    return updatedUser;
  }

  async deleteUser(id: string): Promise<User | null> {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      console.log('User not found');
      return null;
    }

    const deletedUser = await this.prisma.user.delete({ where: { id } });

    return deletedUser;
  }
}

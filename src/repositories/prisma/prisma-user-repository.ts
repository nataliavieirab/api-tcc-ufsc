import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Prisma, User, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user-repository';
import { findUsersFilters } from 'src/modules/organization/user/dtos/find-users-filter';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class PrismaUsersRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    name: string,
    last_name: string,
    birth_date: Date,
    cpf: string,
    email: string,
    password: string,
    user_name: string,
    role: UserRole,
  ): Promise<User> {
    return await this.prisma.user.create({
      data: {
        id: randomUUID(),
        name,
        last_name,
        birth_date,
        cpf,
        email,
        password: await bcrypt.hash(password, 10),
        user_name,
        role,
      },
    });
  }

  async findAll(filters: findUsersFilters): Promise<User[]> {
    const { name, last_name, cpf, user_name, role } = filters;

    const prismaFilters: Prisma.UserWhereInput = {
      name: name ? { contains: name } : undefined,
      last_name: last_name ? { contains: last_name } : undefined,
      cpf: cpf ? { equals: cpf } : undefined,
      user_name: user_name ? { equals: user_name } : undefined,
      role: role ? { equals: role } : undefined,
    };

    return await this.prisma.user.findMany({
      where: prismaFilters,
    });
  }

  async findById(id: string): Promise<User | null> {
    const params = { where: { id } };

    return await this.prisma.user.findUnique(params);
  }

  async findByEmail(email: string): Promise<User | null> {
    const params = { where: { email } };

    return await this.prisma.user.findUnique(params);
  }

  async findByUserName(user_name: string): Promise<User | null> {
    const params = { where: { user_name } };

    return await this.prisma.user.findUnique(params);
  }

  async update(
    id: string,
    name: string,
    last_name: string,
    birth_date: Date,
    cpf: string,
    email: string,
    password: string,
    user_name: string,
    role: UserRole,
  ): Promise<User | null> {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      return null;
    }

    if (password) password = await bcrypt.hash(password, 10);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name,
        last_name,
        birth_date,
        cpf,
        email,
        password,
        user_name,
        role,
      },
    });

    return updatedUser;
  }

  async delete(id: string): Promise<User | null> {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      console.log('User not found');
      return null;
    }

    const deletedUser = await this.prisma.user.delete({ where: { id } });

    return deletedUser;
  }
}

import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Branch, Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { BranchRepository } from '../branch-repository';
import { findBranchFilters } from 'src/modules/organization/branch/dtos/find-branch-filters';

@Injectable()
export class PrismaBranchRepository implements BranchRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    name: string,
    cnpj: string,
    address: string,
    number: number,
    complement: string,
    neighborhood: string,
    city: string,
    state: string,
    country: string,
    zip_code: string,
    phone: string,
    email: string,
  ): Promise<Branch> {
    return await this.prisma.branch.create({
      data: {
        id: randomUUID(),
        name,
        cnpj,
        address,
        number,
        complement,
        neighborhood,
        city,
        state,
        country,
        zip_code,
        phone,
        email,
      },
    });
  }

  async findAll(filters: findBranchFilters): Promise<Branch[]> {
    const { name, cnpj, city, state, zip_code, phone, email } = filters;

    const prismaFilters: Prisma.BranchWhereInput = {
      name: name ? { contains: name } : undefined,
      cnpj: cnpj ? { equals: cnpj } : undefined,
      city: city ? { contains: city } : undefined,
      state: state ? { contains: state } : undefined,
      zip_code: zip_code ? { contains: zip_code } : undefined,
      phone: phone ? { contains: phone } : undefined,
      email: email ? { contains: email } : undefined,
    };

    return await this.prisma.branch.findMany({
      where: prismaFilters,
    });
  }

  async findById(id: string): Promise<Branch | null> {
    const params = { where: { id } };

    return await this.prisma.branch.findUnique(params);
  }

  async update(
    id: string,
    name: string,
    cnpj: string,
    address: string,
    number: number,
    complement: string,
    neighborhood: string,
    city: string,
    state: string,
    country: string,
    zip_code: string,
    phone: string,
    email: string,
  ): Promise<Branch | null> {
    const existingBranch = await this.prisma.branch.findUnique({
      where: { id },
    });

    if (!existingBranch) {
      return null;
    }

    const updatedBranch = await this.prisma.branch.update({
      where: { id },
      data: {
        name,
        cnpj,
        address,
        number,
        complement,
        neighborhood,
        city,
        state,
        country,
        zip_code,
        phone,
        email,
      },
    });

    return updatedBranch;
  }

  async delete(id: string): Promise<Branch | null> {
    const existingBranch = await this.prisma.branch.findUnique({
      where: { id },
    });

    if (!existingBranch) {
      console.log('Branch not found');
      return null;
    }

    const deletedBranch = await this.prisma.branch.delete({
      where: { id },
    });

    return deletedBranch;
  }
}

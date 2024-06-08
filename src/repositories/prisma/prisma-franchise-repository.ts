import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Franchise, Prisma } from '@prisma/client';
import { FranchiseRepository } from '../franchise-repository';
import { findFranchisesFilters } from 'src/modules/organization/franchise/dtos/find-franchises-filters';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class PrismaFranchiseRepository implements FranchiseRepository {
  constructor(private prisma: PrismaService) {}

  async createFranchise(
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
    adm_id: string,
    organization_id: string,
  ): Promise<Franchise> {
    return await this.prisma.franchise.create({
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
        adm_id,
        organization_id,
      },
    });
  }

  async findAllFranchises(
    filters: findFranchisesFilters,
  ): Promise<Franchise[]> {
    const { name, cnpj, city, state, zip_code, phone, email, adm_id } = filters;

    const prismaFilters: Prisma.FranchiseWhereInput = {
      name: name ? { contains: name } : undefined,
      cnpj: cnpj ? { equals: cnpj } : undefined,
      city: city ? { contains: city } : undefined,
      state: state ? { contains: state } : undefined,
      zip_code: zip_code ? { contains: zip_code } : undefined,
      phone: phone ? { contains: phone } : undefined,
      email: email ? { contains: email } : undefined,
      adm_id: adm_id ? { equals: adm_id } : undefined,
    };

    return await this.prisma.franchise.findMany({
      where: prismaFilters,
    });
  }

  async findFranchiseById(id: string): Promise<Franchise | null> {
    const params = { where: { id } };

    return await this.prisma.franchise.findUnique(params);
  }

  async updateFranchise(
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
    adm_id: string,
    organization_id: string,
  ): Promise<Franchise | null> {
    const existingFranchise = await this.prisma.franchise.findUnique({
      where: { id },
    });

    if (!existingFranchise) {
      return null;
    }

    const updatedFranchise = await this.prisma.franchise.update({
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
        adm_id,
        organization_id,
      },
    });

    return updatedFranchise;
  }

  async deleteFranchise(id: string): Promise<Franchise | null> {
    const existingFranchise = await this.prisma.franchise.findUnique({
      where: { id },
    });

    if (!existingFranchise) {
      console.log('Franchise not found');
      return null;
    }

    const deletedFranchise = await this.prisma.franchise.delete({
      where: { id },
    });

    return deletedFranchise;
  }
}

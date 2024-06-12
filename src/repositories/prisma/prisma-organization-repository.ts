import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Organization, Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { OrganizationRepository } from '../organization-repository';
import { findOrganizationFilters } from 'src/modules/admin/organization/dtos/find-organization-filters';

@Injectable()
export class PrismaOrganizationRepository implements OrganizationRepository {
  constructor(private prisma: PrismaService) {}

  async createOrganization(
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
  ): Promise<Organization> {
    return await this.prisma.organization.create({
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

  async findAllOrganizations(
    filters: findOrganizationFilters,
  ): Promise<Organization[]> {
    const { name, cnpj, city, state, zip_code, phone, email } = filters;

    const prismaFilters: Prisma.OrganizationWhereInput = {
      name: name ? { contains: name } : undefined,
      cnpj: cnpj ? { equals: cnpj } : undefined,
      city: city ? { contains: city } : undefined,
      state: state ? { contains: state } : undefined,
      zip_code: zip_code ? { contains: zip_code } : undefined,
      phone: phone ? { contains: phone } : undefined,
      email: email ? { contains: email } : undefined,
    };

    return await this.prisma.organization.findMany({
      where: prismaFilters,
    });
  }

  async findOrganizationById(id: string): Promise<Organization | null> {
    const params = { where: { id } };

    return await this.prisma.organization.findUnique(params);
  }

  async updateOrganization(
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
  ): Promise<Organization | null> {
    const existingOrganization = await this.prisma.organization.findUnique({
      where: { id },
    });

    if (!existingOrganization) {
      return null;
    }

    const updatedOrganization = await this.prisma.organization.update({
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

    return updatedOrganization;
  }

  async deleteOrganization(id: string): Promise<Organization | null> {
    const existingOrganization = await this.prisma.organization.findUnique({
      where: { id },
    });

    if (!existingOrganization) {
      console.log('Organization not found');
      return null;
    }

    const deletedOrganization = await this.prisma.organization.delete({
      where: { id },
    });

    return deletedOrganization;
  }
}

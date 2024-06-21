import { Injectable } from '@nestjs/common';
import { Franchise } from '@prisma/client';
import { CreateFranchiseBody } from 'src/modules/organization/franchise/dtos/create-franchise-body';
import { findFranchisesFilters } from 'src/modules/organization/franchise/dtos/find-franchises-filters';
import { UpdateFranchiseBody } from 'src/modules/organization/franchise/dtos/update-franchise-body';
import { FranchiseRepository } from 'src/repositories/franchise-repository';

@Injectable()
export class FranchiseService {
  constructor(private readonly franchiseRepository: FranchiseRepository) {}

  async findAll(
    findFranchisesFilters: findFranchisesFilters,
  ): Promise<Franchise[]> {
    return await this.franchiseRepository.findAll(findFranchisesFilters);
  }

  async findById(id: string): Promise<Franchise> {
    return await this.franchiseRepository.findById(id);
  }

  async create(createFranchiseBody: CreateFranchiseBody): Promise<Franchise> {
    const {
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
    } = createFranchiseBody;

    return await this.franchiseRepository.create(
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
    );
  }

  async update(
    id: string,
    updateFranchiseBody: UpdateFranchiseBody,
  ): Promise<Franchise> {
    const {
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
    } = updateFranchiseBody;

    return await this.franchiseRepository.update(
      id,
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
    );
  }

  async delete(id: string): Promise<Franchise> {
    return await this.franchiseRepository.delete(id);
  }
}

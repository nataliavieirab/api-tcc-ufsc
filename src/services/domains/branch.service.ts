import { Injectable } from '@nestjs/common';
import { CreateBranchBody } from 'src/modules/organization/branch/dtos/create-branch-body';
import { findBranchFilters } from 'src/modules/organization/branch/dtos/find-branch-filters';
import { UpdateBranchBody } from 'src/modules/organization/branch/dtos/update-branch-body';
import { BranchRepository } from 'src/repositories/branch-repository';

@Injectable()
export class BranchService {
  constructor(private readonly branchRepository: BranchRepository) {}

  async findAll(findBranchFilters: findBranchFilters): Promise<Branch[]> {
    return this.branchRepository.findAll(findBranchFilters);
  }

  async findById(id: string): Promise<Branch | null> {
    return this.branchRepository.findById(id);
  }

  async create(createBranchBody: CreateBranchBody): Promise<Branch> {
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
    } = createBranchBody;

    return this.branchRepository.create(
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
    );
  }

  async update(
    id: string,
    updateBranchBody: UpdateBranchBody,
  ): Promise<Branch | null> {
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
    } = updateBranchBody;

    return this.branchRepository.update(
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
    );
  }

  async delete(id: string): Promise<Branch> | null {
    return this.branchRepository.delete(id);
  }
}

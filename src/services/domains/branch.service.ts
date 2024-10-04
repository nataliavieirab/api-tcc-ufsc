import { Injectable } from '@nestjs/common';
import { CreateCompanyBody } from 'src/modules/organization/company/dtos/create-company-body';
import { findCompanyFilters } from 'src/modules/organization/company/dtos/find-company-filters';
import { UpdateCompanyBody } from 'src/modules/organization/company/dtos/update-company-body';
import { CompanyRepository } from 'src/repositories/company-repository';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async findAll(findCompanyFilters: findCompanyFilters): Promise<Company[]> {
    return this.companyRepository.findAll(findCompanyFilters);
  }

  async findById(id: string): Promise<Company | null> {
    return this.companyRepository.findById(id);
  }

  async create(createCompanyBody: CreateCompanyBody): Promise<Company> {
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
    } = createCompanyBody;

    return this.companyRepository.create(
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
    updateCompanyBody: UpdateCompanyBody,
  ): Promise<Company | null> {
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
    } = updateCompanyBody;

    return this.companyRepository.update(
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

  async delete(id: string): Promise<Company> | null {
    return this.companyRepository.delete(id);
  }
}

import { findCompanyFilters } from 'src/modules/organization/company/dtos/find-company-filters';

export abstract class CompanyRepository {
  abstract findAll(
    findCompaniesFilters: findCompanyFilters,
  ): Promise<Company[]>;

  abstract findById(id: string): Promise<Company | null>;

  abstract create(
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
  );

  abstract update(
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
  ): Promise<Company | null>;

  abstract delete(id: string): Promise<Company | null>;
}

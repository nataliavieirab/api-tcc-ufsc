import { findOrganizationFilters } from 'src/modules/admin/organization/dtos/find-organization-filters';

export abstract class OrganizationRepository {
  abstract findAllOrganizations(
    findOrganizationsFilters: findOrganizationFilters,
  ): Promise<Organization[]>;

  abstract findOrganizationById(id: string): Promise<Organization | null>;

  abstract createOrganization(
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

  abstract updateOrganization(
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
  ): Promise<Organization | null>;

  abstract deleteOrganization(id: string): Promise<Organization | null>;
}

import { Franchise } from '@prisma/client';
import { findFranchisesFilters } from 'src/modules/organization/franchise/dtos/find-franchises-filters';

export abstract class FranchiseRepository {
  abstract findAll(
    findFranchisesFilters: findFranchisesFilters,
  ): Promise<Franchise[]>;

  abstract findById(id: string): Promise<Franchise | null>;

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
    adm_id: string,
    organization_id: string,
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
    adm_id: string,
    organization_id: string,
  ): Promise<Franchise | null>;

  abstract delete(id: string): Promise<Franchise | null>;
}

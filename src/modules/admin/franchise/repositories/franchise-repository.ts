import { Franchise } from '@prisma/client';
import { findFranchisesFilters } from 'src/franchise/dtos/find-franchises-filters';

export abstract class FranchiseRepository {
  abstract findAllFranchises(
    findFranchisesFilters: findFranchisesFilters,
  ): Promise<Franchise[]>;

  abstract findFranchiseById(id: string): Promise<Franchise | null>;

  abstract createFranchise(
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
  );

  abstract updateFranchise(
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
  ): Promise<Franchise | null>;

  abstract deleteFranchise(id: string): Promise<Franchise | null>;
}

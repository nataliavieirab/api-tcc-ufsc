import { Branch } from '@prisma/client';
import { findBranchFilters } from 'src/modules/organization/branch/dtos/find-branch-filters';

export abstract class BranchRepository {
  abstract findAll(findBranchesFilters: findBranchFilters): Promise<Branch[]>;

  abstract findById(id: string): Promise<Branch | null>;

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
  ): Promise<Branch | null>;

  abstract delete(id: string): Promise<Branch | null>;
}

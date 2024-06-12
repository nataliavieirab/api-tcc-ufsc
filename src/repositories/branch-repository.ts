import { Branch } from '@prisma/client';
import { findBranchesFilters } from 'src/modules/franchise/branch/dtos/find-branch-filters';

export abstract class BranchRepository {
  abstract findAllBranches(
    findBranchesFilters: findBranchesFilters,
  ): Promise<Branch[]>;

  abstract findBranchById(id: string): Promise<Branch | null>;

  abstract createBranch(
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

  abstract updateBranch(
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

  abstract deleteBranch(id: string): Promise<Branch | null>;
}

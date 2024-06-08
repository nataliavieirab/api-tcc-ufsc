import { User, UserRole } from '@prisma/client';
import { findUsersFilters } from '../modules/organization/user/dtos/find-users-filter';

export abstract class UserRepository {
  abstract findAll(findUsersFilters: findUsersFilters): Promise<User[]>;

  abstract findById(id: string): Promise<User | null>;

  abstract findByEmail(email: string): Promise<User | null>;

  abstract findByUserName(user_name: string): Promise<User | null>;

  abstract create(
    name: string,
    last_name: string,
    birth_date: Date,
    cpf: string,
    email: string,
    password: string,
    user_name: string,
    role: UserRole,
  ): Promise<User>;

  abstract update(
    id: string,
    name: string,
    last_name: string,
    birth_date: Date,
    cpf: string,
    email: string,
    password: string,
    user_name: string,
    role: UserRole,
  ): Promise<User | null>;

  abstract delete(id: string): Promise<User | null>;
}

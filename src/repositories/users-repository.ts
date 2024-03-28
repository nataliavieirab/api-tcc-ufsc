import { User, UserRole } from '@prisma/client';
import { findUsersFilters } from '../modules/admin/dtos/users-dtos/find-users-filter';

export abstract class UsersRepository {
  abstract findAllUsers(findUsersFilters: findUsersFilters): Promise<User[]>;

  abstract findUserById(id: string): Promise<User | null>;

  abstract createUser(
    name: string,
    last_name: string,
    birth_date: Date,
    cpf: string,
    email: string,
    password: string,
    user_name: string,
    roles: UserRole[],
  ): Promise<User>;

  abstract updateUser(
    id: string,
    name: string,
    last_name: string,
    birth_date: Date,
    cpf: string,
    email: string,
    password: string,
    user_name: string,
    roles: UserRole[],
  ): Promise<User | null>;

  abstract deleteUser(id: string): Promise<User | null>;
}

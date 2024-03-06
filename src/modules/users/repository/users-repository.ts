import { User, UserRole } from '@prisma/client';

export abstract class UsersRepository {
  abstract createUser(
    name: string,
    last_name: string,
    birth_date: number,
    cpf: string,
    password: string,
    user_name: string,
    roles: UserRole[],
  ): Promise<User>;
}

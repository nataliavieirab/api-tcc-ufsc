import { Injectable } from '@nestjs/common';
import { CreateUserBody } from 'src/modules/organization/user/dtos/create-user-body';
import { findUsersFilters } from 'src/modules/organization/user/dtos/find-users-filter';
import { UpdateUserBody } from 'src/modules/organization/user/dtos/update-user-body';
import { UserRepository } from 'src/repositories/user-repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(findUsersFilters: findUsersFilters): Promise<User[]> {
    return await this.userRepository.findAll(findUsersFilters);
  }

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async create(createUserBody: CreateUserBody): Promise<User> {
    const {
      name,
      last_name,
      birth_date,
      cpf,
      email,
      password,
      user_name,
      role,
    } = createUserBody;

    return await this.userRepository.create(
      name,
      last_name,
      birth_date,
      cpf,
      email,
      password,
      user_name,
      role,
    );
  }

  async update(id: string, updateUserBody: UpdateUserBody): Promise<User> {
    const {
      name,
      last_name,
      birth_date,
      cpf,
      email,
      password,
      user_name,
      role,
    } = updateUserBody;

    return await this.userRepository.update(
      id,
      name,
      last_name,
      birth_date,
      cpf,
      email,
      password,
      user_name,
      role,
    );
  }

  async delete(id: string): Promise<User | null> {
    return await this.userRepository.delete(id);
  }
}

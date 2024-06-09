import { User } from '@prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserRepository } from '../../../repositories/user-repository';
import { actions } from 'src/services/permissions/permissions';
import { CreateUserBody } from './dtos/create-user-body';
import { UpdateUserBody } from './dtos/update-user-body';
import { findUsersFilters } from './dtos/find-users-filters';
import { AccessValidator } from 'src/modules/auth/decorators/access-validator.decorator';
@Controller('admin/users')
export class UsersController {
  private validateAccess: (action: actions) => void;

  constructor(private userRepository: UserRepository) {
    this.validateAccess = AccessValidator;
  }

  @Get()
  async findAll(@Body() body: findUsersFilters): Promise<User[]> {
    this.validateAccess('findAllUsers');

    return this.userRepository.findAll(body);
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: any) {
    this.validateAccess('findUserById');
    try {
      const user = await this.userRepository.findById(id);

      const status = user ? 200 : 404;
      res.status(status).send(user);
    } catch (error) {
      res.status(500).send({ message: 'Erro ao buscar usuário por ID.' });
    }
  }

  @Post()
  async create(@Body() body: CreateUserBody, @Res() res: any) {
    this.validateAccess('createUser');

    const {
      name,
      last_name,
      birth_date,
      cpf,
      email,
      password,
      user_name,
      role,
    } = body;

    const user = await this.userRepository.create(
      name,
      last_name,
      birth_date,
      cpf,
      email,
      password,
      user_name,
      role,
    );

    res.status(201).send({ ...user, password: undefined });
  }

  @Put('/:id')
  async update(
    @Body() body: UpdateUserBody,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    this.validateAccess('updateUser');

    const {
      name,
      last_name,
      birth_date,
      cpf,
      email,
      password,
      user_name,
      role,
    } = body;

    const user = await this.userRepository.update(
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

    const status = user ? 200 : 404;
    res.status(status).send({ ...user, password: undefined });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: any) {
    this.validateAccess('deleteUser');

    const user = await this.userRepository.delete(id);

    const status = user ? 204 : 404;
    res.status(status).send();
  }
}

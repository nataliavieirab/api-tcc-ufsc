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
import { CreateUserBody } from './dtos/create-user-body';
import { UpdateUserBody } from './dtos/update-user-body';
import { findUsersFilters } from './dtos/find-users-filters';
import {
  AccessValidator,
  accessValidator,
} from 'src/modules/auth/decorators/access-validator.decorator';
@Controller('franchises/users')
export class UsersController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  async findAll(
    @AccessValidator() validateAccess: accessValidator,
    @Body() body: findUsersFilters,
  ): Promise<User[]> {
    validateAccess('findAllUsers');
    return this.userRepository.findAll(body);
  }

  @Get('/:id')
  async findById(
    @AccessValidator() validateAccess: accessValidator,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    validateAccess('findUserById');
    const user = await this.userRepository.findById(id);

    const status = user ? 200 : 404;
    res.status(status).send(user);
  }

  @Post()
  async create(
    @AccessValidator() validateAccess: accessValidator,
    @Body() body: CreateUserBody,
    @Res() res: any,
  ) {
    validateAccess('createUser');
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
    @AccessValidator() validateAccess: accessValidator,
    @Body() body: UpdateUserBody,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    validateAccess('updateUser');
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
  async delete(
    @AccessValidator() validateAccess: accessValidator,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    validateAccess('deleteUser');
    const user = await this.userRepository.delete(id);

    const status = user ? 204 : 404;
    res.status(status).send();
  }
}

import { CreateUserBody } from './dtos/create-user-body';
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
import { findUsersFilters } from './dtos/find-users-filter';
import { UpdateUserBody } from './dtos/update-user-body';
import { UserRepository } from '../../../repositories/user-repository';
import { AccessValidator } from 'src/modules/auth/decorators/access-validator.decorator';
import { actions } from 'src/services/permissions/permissions';
@Controller('organizations/users')
export class UsersController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  async findAll(@Body() body: findUsersFilters): Promise<User[]> {
    return this.userRepository.findAll(body);
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: any) {
    const user = this.userRepository.findById(id);

    const status = user ? 200 : 404;
    res.status(status).send(user);
  }

  @Post()
  async create(
    @AccessValidator() validateUserAccess: (action: actions) => void,
    @Body() body: CreateUserBody,
    @Res() res: any,
  ) {
    validateUserAccess('createUser');
    const {
      name,
      last_name,
      birth_date,
      cpf,
      email,
      password,
      user_name,
      roles,
    } = body;

    const user = await this.userRepository.create(
      name,
      last_name,
      birth_date,
      cpf,
      email,
      password,
      user_name,
      roles,
    );

    res.status(201).send({ ...user, password: undefined });
  }

  @Put('/:id')
  async update(
    @Body() body: UpdateUserBody,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    const {
      name,
      last_name,
      birth_date,
      cpf,
      email,
      password,
      user_name,
      roles,
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
      roles,
    );

    const status = user ? 200 : 404;
    res.status(status).send({ ...user, password: undefined });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: any) {
    const user = await this.userRepository.delete(id);

    const status = user ? 204 : 404;
    res.status(status).send();
  }
}

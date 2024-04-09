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

@Controller('users')
export class UsersController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  async findAllUsers(@Body() body: findUsersFilters): Promise<User[]> {
    return this.userRepository.findAll(body);
  }

  @Get('/:id')
  async findUserById(@Param('id') id: string, @Res() res: any) {
    const user = this.userRepository.findById(id);

    const status = user ? 200 : 404;
    res.status(status).send(user);
  }

  @Get()
  @Post()
  async createUser(@Body() body: CreateUserBody, @Res() res: any) {
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
  async updateUser(
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
  async deleteUser(@Param('id') id: string, @Res() res: any) {
    const user = await this.userRepository.delete(id);

    const status = user ? 204 : 404;
    res.status(status).send();
  }
}

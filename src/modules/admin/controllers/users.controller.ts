import { CreateUserBody } from '../dtos/users-dtos/create-user-body';
import { User } from '@prisma/client';
import { UsersRepository } from '../../../repositories/users-repository';
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
import { findUsersFilters } from '../dtos/users-dtos/find-users-filter';
import { UpdateUserBody } from '../dtos/users-dtos/update-user-body';

@Controller('users')
export class UsersController {
  constructor(private usersRepository: UsersRepository) {}

  @Get()
  async findAllUsers(@Body() body: findUsersFilters): Promise<User[]> {
    return this.usersRepository.findAllUsers(body);
  }

  @Get('/:id')
  async findUserById(@Param('id') id: string, @Res() res: any) {
    const user = this.usersRepository.findUserById(id);

    const status = user ? 200 : 404;
    res.status(status).send(user);
  }

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

    const user = await this.usersRepository.createUser(
      name,
      last_name,
      birth_date,
      cpf,
      email,
      password,
      user_name,
      roles,
    );

    res.status(201).send(user);
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

    const user = await this.usersRepository.updateUser(
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
    res.status(status).send(user);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string, @Res() res: any) {
    const user = await this.usersRepository.deleteUser(id);

    const status = user ? 204 : 404;
    res.status(status).send();
  }
}

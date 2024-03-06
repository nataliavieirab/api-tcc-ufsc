import { CreateUserBody } from './dtos/create-user-body';
import { UsersRepository } from './repository/users-repository';
import { User } from '@prisma/client';
import { UpdateUserBody } from './dtos/update-user-body';
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

@Controller('users')
export class UsersController {
  usersService: any;
  constructor(private UsersRepository: UsersRepository) {}

  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findUserById(id);
  }

  @Post()
  async createUser(@Body() body: CreateUserBody, @Res() res: any) {
    const { name, last_name, birth_date, cpf, password, user_name, roles } =
      body;

    const user = await this.UsersRepository.createUser(
      name,
      last_name,
      birth_date,
      cpf,
      password,
      user_name,
      roles,
    );

    res.status(201).send(user);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() UpdateUserBody: UpdateUserBody,
  ): Promise<User> {
    return this.usersService.updateUser(id, UpdateUserBody);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}

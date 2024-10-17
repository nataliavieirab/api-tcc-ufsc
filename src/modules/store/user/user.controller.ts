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
import { DefaultController } from 'src/modules/default.controller';
import { UserService } from 'src/services/domains/user.service';
import { FindUsersFilters } from './dtos/find-users-filters';
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { User } from 'src/entities/user.entity';
import { UpdateUserBody } from './dtos/update-user-body';
import { CreateUserBody } from './dtos/create-user-body';
import { Response } from 'express';

@Controller('store/users')
export class UsersController extends DefaultController {
  constructor(private userService: UserService) {
    super();
  }

  @Get()
  async findAll(
    @Body() body: FindUsersFilters,
  ): Promise<EntityPagination<User>> {
    this.validateAccess('findAllUsers');
    return this.userService.findAll(body);
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    this.validateAccess('findUserById');
    const user = await this.userService.findById(id);

    res.status(200).send(user);
  }

  @Post()
  async create(@Body() body: CreateUserBody, @Res() res: Response) {
    this.validateAccess('createUser');
    const user = await this.userService.create(body);
    res.status(201).send({ ...user, password: undefined });
  }

  @Put('/:id')
  async update(
    @Body() body: UpdateUserBody,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    this.validateAccess('updateUser');
    const user = await this.userService.update(id, body);

    res.status(200).send({ ...user, password: undefined });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    this.validateAccess('deleteUser');
    await this.userService.delete(id);

    res.status(204).send();
  }
}
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
import { CreateUserBody } from './dtos/create-user-body';
import { UpdateUserBody } from './dtos/update-user-body';
import { findUsersFilters } from './dtos/find-users-filters';
import { UserService } from 'src/services/domains/user.service';
import { User } from 'src/entities/user.entity';
import { DefaultController } from 'src/modules/default.controller';
import { EntityPagination } from 'src/utils/entity-pagination.type';
@Controller('admin/users')
export class UsersController extends DefaultController {
  constructor(private userService: UserService) {
    super();
  }

  @Get()
  async findAll(
    @Body() body: findUsersFilters,
  ): Promise<EntityPagination<User>> {
    this.validateAccess('findAllUsers');
    return this.userService.findAll(body);
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: any) {
    this.validateAccess('findUserById');
    const user = await this.userService.findById(id);

    res.status(200).send(user);
  }

  @Post()
  async create(@Body() body: CreateUserBody, @Res() res: any) {
    this.validateAccess('createUser');

    const user = await this.userService.create(body);

    res.status(201).send({ ...user, password: undefined });
  }

  @Put('/:id')
  async update(
    @Body() body: UpdateUserBody,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    this.validateAccess('updateUser');
    const user = await this.userService.update(id, body);

    res.status(200).send({ ...user, password: undefined });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: any) {
    this.validateAccess('deleteUser');
    await this.userService.delete(id);

    res.status(204).send();
  }
}

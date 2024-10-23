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
import { UserService } from 'src/services/domains/user.service';
import { findUsersFilters } from './dtos/find-users-filter';
import { DefaultController } from 'src/modules/default.controller';
@Controller('organization/users')
export class UsersController extends DefaultController {
  constructor(private userService: UserService) {
    super();
  }

  module = 'organization';

  @Get()
  async findAll(@Body() body: findUsersFilters, @Res() res: any) {
    await this.validateAccess('findAllUsers');
    const users = await this.userService.findAll(body);
    users.content = users.content.map((user) => {
      user.password = undefined;
      return user;
    });

    res.status(200).send(users);
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: any) {
    await this.validateAccess('findUserById');
    const user = await this.userService.findById(id);

    res.status(200).send(user);
  }

  @Post()
  async create(@Body() body: CreateUserBody, @Res() res: any) {
    await this.validateAccess('createUser');

    const user = await this.userService.create(body);

    res.status(201).send({ ...user, password: undefined });
  }

  @Put('/:id')
  async update(
    @Body() body: UpdateUserBody,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    await this.validateAccess('updateUser');
    const user = await this.userService.update(id, body);

    res.status(200).send({ ...user, password: undefined });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: any) {
    await this.validateAccess('deleteUser');
    await this.userService.delete(id);

    res.status(204).send();
  }
}

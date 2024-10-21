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
import {
  AccessValidator,
  accessValidator,
} from 'src/modules/auth/decorators/access-validator.decorator';
import { UserService } from 'src/services/domains/user.service';
import { findUsersFilters } from './dtos/find-users-filter';
@Controller('organization/users')
export class UsersController {
  constructor(private userService: UserService) {}

  module = 'organization';

  @Get()
  async findAll(
    @AccessValidator() validateAccess: accessValidator,
    @Body() body: findUsersFilters,
  ): Promise<User[]> {
    validateAccess('findAllUsers');
    return this.userService.findAll(body);
  }

  @Get('/:id')
  async findById(
    @AccessValidator() validateAccess: accessValidator,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    validateAccess('findUserById');
    const user = await this.userService.findById(id);

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

    const user = await this.userService.create(body);

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
    const user = await this.userService.update(id, body);

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
    const user = await this.userService.delete(id);

    const status = user ? 204 : 404;
    res.status(status).send();
  }
}

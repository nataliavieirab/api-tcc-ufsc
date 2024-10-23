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
import { Actions } from 'src/services/permissions/permissions';

@Controller('store/:storeId/users')
export class UsersController extends DefaultController {
  constructor(private userService: UserService) {
    super();
  }

  module = 'store';

  @Get()
  async findAll(
    @Body() body: FindUsersFilters,
  ): Promise<EntityPagination<User>> {
    await this.validateAccess(Actions.findUsers);
    return this.userService.findAll(body);
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    await this.validateAccess(Actions.findUsers);
    const user = await this.userService.findById(id);

    res.status(200).send(user);
  }

  @Post()
  async create(
    @Param('storeId') storeId: string,
    @Body() body: CreateUserBody,
    @Res() res: Response,
  ) {
    await this.validateAccess(Actions.createUser);
    const user = await this.userService.create({ storeId, ...body });

    res.status(201).send({ ...user, password: undefined });
  }

  @Put('/:id')
  async update(
    @Body() body: UpdateUserBody,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    await this.validateAccess(Actions.updateUser);
    const user = await this.userService.update(id, body);

    res.status(200).send({ ...user, password: undefined });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.validateAccess(Actions.deleteUser);
    await this.userService.delete(id);

    res.status(204).send();
  }
}

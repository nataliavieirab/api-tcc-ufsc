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
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { FindRolesFilters } from './dtos/find-roles-filters';
import { RoleService } from 'src/services/domains/role.service';
import { Role } from 'src/entities/role.entity';
import { CreateRoleBody } from './dtos/create-role-body';
import { UpdateRoleBody } from './dtos/update-role-body';
import { Modules } from 'src/services/permissions/permissions';
@Controller('admin/users')
export class RolesController extends DefaultController {
  constructor(private roleService: RoleService) {
    super();
  }

  @Get()
  async findAll(
    @Body() body: FindRolesFilters,
  ): Promise<EntityPagination<Role>> {
    this.validateAccess('findAllRoles');

    return this.roleService.findAll(body);
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: any) {
    this.validateAccess('findRoleById');
    const user = await this.roleService.findById(id);

    res.status(200).send(user);
  }

  @Post()
  async create(@Body() body: CreateRoleBody, @Res() res: any) {
    this.validateAccess('createRole');

    const role = await this.roleService.create({
      ...body,
      module: Modules.store,
    });

    res.status(201).send(role);
  }

  @Put('/:id')
  async update(
    @Body() body: UpdateRoleBody,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    this.validateAccess('updateRole');
    const role = await this.roleService.update(id, {
      ...body,
      module: Modules.store,
    });

    res.status(200).send(role);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: any) {
    this.validateAccess('deleteRole');
    await this.roleService.delete(id);

    res.status(204).send();
  }
}

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
import { OrganizationService } from 'src/services/domains/organization.service';
import { Organization } from 'src/entities/organization.entity';
import { findOrgsFilters } from './dtos/find-orgs-filters';
import { UpdateOrganizationBody } from './dtos/update-organization-body';
import { CreateOrganizationBody } from './dtos/create-organization-body';
@Controller('admin/organizations')
export class OrganizationsController extends DefaultController {
  constructor(private organizationService: OrganizationService) {
    super();
  }

  module = 'admin';

  @Get()
  async findAll(
    @Body() body: findOrgsFilters,
  ): Promise<EntityPagination<Organization>> {
    await this.validateAccess('findAllOrganizations');
    return this.organizationService.findAll(body);
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: any) {
    await this.validateAccess('findOrganizationById');
    const organization = await this.organizationService.findById(id);

    res.status(200).send(organization);
  }

  @Post()
  async create(@Body() body: CreateOrganizationBody, @Res() res: any) {
    await this.validateAccess('createOrganization');

    const organization = await this.organizationService.create(body);

    res.status(201).send({ ...organization, password: undefined });
  }

  @Put('/:id')
  async update(
    @Body() body: UpdateOrganizationBody,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    await this.validateAccess('updateOrganization');
    const organization = await this.organizationService.update(id, body);

    res.status(200).send(organization);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: any) {
    await this.validateAccess('deleteOrganization');
    await this.organizationService.delete(id);

    res.status(204).send();
  }
}

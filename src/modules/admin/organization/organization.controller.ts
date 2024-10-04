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
import {
  AccessValidator,
  accessValidator,
} from 'src/modules/auth/decorators/access-validator.decorator';
import { OrganizationRepository } from 'src/repositories/organization-repository';
import { findOrganizationFilters } from './dtos/find-organization-filters';
import { CreateOrganizationBody } from './dtos/create-organization-body';
import { UpdateOrganizationBody } from './dtos/update-organization-body';

@Controller('admin/organizations')
export class OrganizationController {
  constructor(private organizationRepository: OrganizationRepository) {}

  @Get()
  async findAllOrganizations(
    @AccessValidator() validateAccess: accessValidator,
    @Body() body: findOrganizationFilters,
  ): Promise<Organization[]> {
    validateAccess('findAllOrganizations');
    return this.organizationRepository.findAllOrganizations(body);
  }

  @Get('/:id')
  async findOrganizationById(
    @AccessValidator() validateAccess: accessValidator,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    validateAccess('findOrganizationById');
    const organization = await this.organizationRepository.findOrganizationById(
      id,
    );

    const status = organization ? 200 : 404;
    res.status(status).send(organization);
  }

  @Post()
  async createOrganization(
    @AccessValidator() validateAccess: accessValidator,
    @Body() body: CreateOrganizationBody,
    @Res() res: any,
  ) {
    validateAccess('createOrganization');
    const {
      name,
      cnpj,
      address,
      number,
      complement,
      neighborhood,
      city,
      state,
      country,
      zip_code,
      phone,
      email,
    } = body;

    const organization = await this.organizationRepository.createOrganization(
      name,
      cnpj,
      address,
      number,
      complement,
      neighborhood,
      city,
      state,
      country,
      zip_code,
      phone,
      email,
    );

    res.status(201).send(organization);
  }

  @Put('/:id')
  async updateOrganization(
    @AccessValidator() validateAccess: accessValidator,
    @Body() body: UpdateOrganizationBody,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    validateAccess('updateOrganization');
    const {
      name,
      cnpj,
      address,
      number,
      complement,
      neighborhood,
      city,
      state,
      country,
      zip_code,
      phone,
      email,
    } = body;

    const organization = await this.organizationRepository.updateOrganization(
      id,
      name,
      cnpj,
      address,
      number,
      complement,
      neighborhood,
      city,
      state,
      country,
      zip_code,
      phone,
      email,
    );

    const status = organization ? 200 : 404;
    res.status(status).send(organization);
  }

  @Delete('/:id')
  async deleteOrganization(
    @AccessValidator() validateAccess: accessValidator,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    validateAccess('deleteOrganization');
    const organization = await this.organizationRepository.deleteOrganization(
      id,
    );

    const status = organization ? 200 : 404;
    res.status(status).send();
  }
}

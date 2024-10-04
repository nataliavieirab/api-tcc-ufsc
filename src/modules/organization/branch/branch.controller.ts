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
import { CreateCompanyBody } from './dtos/create-company-body';
import { UpdateCompanyBody } from './dtos/update-company-body';
import { findCompanyFilters } from './dtos/find-company-filters';
import { CompanyService } from 'src/services/domains/company.service';

@Controller('/companyes')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  async findAllCompanies(
    @AccessValidator() validateAccess: accessValidator,
    @Body() body: findCompanyFilters,
  ): Promise<Company[]> {
    validateAccess('findAllCompanies');
    return this.companyService.findAll(body);
  }

  @Get('/:id')
  async findCompanyById(
    @AccessValidator() validateAccess: accessValidator,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    validateAccess('findCompanyById');
    const company = await this.companyService.findById(id);

    const status = company ? 200 : 404;
    res.status(status).send(company);
  }

  @Post()
  async createCompany(
    @AccessValidator() validateAccess: accessValidator,
    @Body() body: CreateCompanyBody,
    @Res() res: any,
  ) {
    validateAccess('createCompany');

    const company = await this.companyService.create(body);

    res.status(201).send(company);
  }

  @Put('/:id')
  async updateCompany(
    @AccessValidator() validateAccess: accessValidator,
    @Body() body: UpdateCompanyBody,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    validateAccess('updateCompany');

    const company = await this.companyService.update(id, body);

    const status = company ? 200 : 404;
    res.status(status).send(company);
  }

  @Delete('/:id')
  async deleteCompany(
    @AccessValidator() validateAccess: accessValidator,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    validateAccess('deleteCompany');
    const company = await this.companyService.delete(id);

    const status = company ? 200 : 404;
    res.status(status).send('Company successfully deleted');
  }
}

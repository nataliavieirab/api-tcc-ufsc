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
import { FindCompanyFilters } from './dtos/find-company-filters';
import { CompanyService } from 'src/services/domains/company.service';
import { Company } from 'src/entities/company.entity';
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { DefaultController } from 'src/modules/default.controller';

@Controller('/companyes')
export class CompanyController extends DefaultController {
  constructor(private companyService: CompanyService) {
    super();
  }

  @Get()
  async findAllCompanies(
    @Body() body: FindCompanyFilters,
  ): Promise<EntityPagination<Company>> {
    this.validateAccess('findAllCompanies');
    return this.companyService.findAll(body);
  }

  @Get('/:id')
  async findCompanyById(@Param('id') id: string, @Res() res: any) {
    this.validateAccess('findCompanyById');
    const company = await this.companyService.findById(id);

    res.status(200).send(company);
  }

  @Post()
  async createCompany(@Body() body: CreateCompanyBody, @Res() res: any) {
    this.validateAccess('createCompany');

    const company = await this.companyService.create(body);

    res.status(201).send(company);
  }

  @Put('/:id')
  async updateCompany(
    @Body() body: UpdateCompanyBody,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    this.validateAccess('updateCompany');

    const company = await this.companyService.update(id, body);

    res.status(200).send(company);
  }

  @Delete('/:id')
  async deleteCompany(@Param('id') id: string, @Res() res: any) {
    this.validateAccess('deleteCompany');
    await this.companyService.delete(id);

    res.status(204).send('Company successfully deleted');
  }
}

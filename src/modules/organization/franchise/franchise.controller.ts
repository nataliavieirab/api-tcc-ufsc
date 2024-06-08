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
import { Franchise } from '@prisma/client';
import { findFranchisesFilters } from './dtos/find-franchises-filters';
import { CreateFranchiseBody } from './dtos/create-franchise-body';
import { UpdateFranchiseBody } from './dtos/update-franchise-body';
import { FranchiseRepository } from '../../../repositories/franchise-repository';

@Controller('organizations/franchises')
export class FranchiseController {
  constructor(private franchiseRepository: FranchiseRepository) {}

  @Get()
  async findAllFranchises(
    @Body() body: findFranchisesFilters,
  ): Promise<Franchise[]> {
    return this.franchiseRepository.findAllFranchises(body);
  }

  @Get('/:id')
  async findFranchiseById(@Param('id') id: string, @Res() res: any) {
    const franchise = this.franchiseRepository.findFranchiseById(id);

    const status = franchise ? 200 : 404;
    res.status(status).send(franchise);
  }

  @Post()
  async createFranchise(@Body() body: CreateFranchiseBody, @Res() res: any) {
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
      adm_id,
      organization_id,
    } = body;

    const franchise = await this.franchiseRepository.createFranchise(
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
      adm_id,
      organization_id,
    );

    res.status(201).send(franchise);
  }

  @Put('/:id')
  async updateFranchise(
    @Body() body: UpdateFranchiseBody,
    @Param('id') id: string,
    @Res() res: any,
  ) {
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
      adm_id,
      organization_id,
    } = body;

    const franchise = await this.franchiseRepository.updateFranchise(
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
      adm_id,
      organization_id,
    );

    const status = franchise ? 200 : 404;
    res.status(status).send(franchise);
  }

  @Delete('/:id')
  async deleteFranchise(@Param('id') id: string, @Res() res: any) {
    const franchise = await this.franchiseRepository.deleteFranchise(id);

    const status = franchise ? 200 : 404;
    res.status(status).send();
  }
}

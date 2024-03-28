import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Franchise } from '@prisma/client';
import { FranchiseRepository } from 'src/repositories/franchise-repository';
import { findFranchisesFilters } from '../dtos/franchise_dtos/find-franchises-filters';
import { CreateFranchiseBody } from '../dtos/franchise_dtos/create-franchise-body';
import { UpdateFranchiseBody } from '../dtos/franchise_dtos/update-franchise-body';

@Controller('franchises')
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
    );

    const status = franchise ? 200 : 404;
    res.status(status).send(franchise);
  }
}

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
import { Branch } from '@prisma/client';
import {
  AccessValidator,
  accessValidator,
} from 'src/modules/auth/decorators/access-validator.decorator';
import { BranchRepository } from 'src/repositories/branch-repository';
import { findBranchesFilters } from './dtos/find-branch-filters';
import { CreateBranchBody } from './dtos/create-branch-body';
import { UpdateBranchBody } from './dtos/update-branch-body';

@Controller('franchises/branches')
export class BranchController {
  constructor(private branchRepository: BranchRepository) {}

  @Get()
  async findAllBranches(
    @AccessValidator() validateAccess: accessValidator,
    @Body() body: findBranchesFilters,
  ): Promise<Branch[]> {
    validateAccess('findAllBranches');
    return this.branchRepository.findAllBranches(body);
  }

  @Get('/:id')
  async findBranchById(
    @AccessValidator() validateAccess: accessValidator,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    validateAccess('findBranchById');
    const branch = await this.branchRepository.findBranchById(id);

    const status = branch ? 200 : 404;
    res.status(status).send(branch);
  }

  @Post()
  async createBranch(
    @AccessValidator() validateAccess: accessValidator,
    @Body() body: CreateBranchBody,
    @Res() res: any,
  ) {
    validateAccess('createBranch');
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

    const branch = await this.branchRepository.createBranch(
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

    res.status(201).send(branch);
  }

  @Put('/:id')
  async updateBranch(
    @AccessValidator() validateAccess: accessValidator,
    @Body() body: UpdateBranchBody,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    validateAccess('updateBranch');
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

    const branch = await this.branchRepository.updateBranch(
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

    const status = branch ? 200 : 404;
    res.status(status).send(branch);
  }

  @Delete('/:id')
  async deleteBranch(
    @AccessValidator() validateAccess: accessValidator,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    validateAccess('deleteBranch');
    const branch = await this.branchRepository.deleteBranch(id);

    const status = branch ? 200 : 404;
    res.status(status).send();
  }
}

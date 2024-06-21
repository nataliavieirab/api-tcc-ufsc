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
import {
  AccessValidator,
  accessValidator,
} from 'src/modules/auth/decorators/access-validator.decorator';
import { FranchiseService } from 'src/services/domains/franchise.service';

@Controller('organizations/franchises')
export class FranchiseController {
  constructor(private franchiseService: FranchiseService) {}

  @Get()
  async findAll(
    @AccessValidator() validateAccess: accessValidator,
    @Body() body: findFranchisesFilters,
  ): Promise<Franchise[]> {
    validateAccess('findAllFranchises');
    return this.franchiseService.findAll(body);
  }

  @Get('/:id')
  async findById(
    @AccessValidator() validateAccess: accessValidator,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    validateAccess('findFranchiseById');
    const franchise = await this.franchiseService.findById(id);

    const status = franchise ? 200 : 404;
    res.status(status).send(franchise);
  }

  @Post()
  async create(
    @AccessValidator() validateAccess: accessValidator,
    @Body() body: CreateFranchiseBody,
    @Res() res: any,
  ) {
    validateAccess('createFranchise');

    const franchise = await this.franchiseService.create(body);

    res
      .status(201)
      .send({ franchise, message: 'Franchise successfully created!' });
  }

  @Put('/:id')
  async update(
    @AccessValidator() validateAccess: accessValidator,
    @Body() body: UpdateFranchiseBody,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    validateAccess('updateFranchise');

    const franchise = await this.franchiseService.update(id, body);

    const status = franchise ? 200 : 404;
    res
      .status(status)
      .send({ franchise, message: 'Franchise successfully updated!' });
  }

  @Delete('/:id')
  async delete(
    @AccessValidator() validateAccess: accessValidator,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    validateAccess('deleteFranchise');
    const franchise = await this.franchiseService.delete(id);

    const status = franchise ? 200 : 404;
    res.status(status).send('Franchise successfully deleted!');
  }
}

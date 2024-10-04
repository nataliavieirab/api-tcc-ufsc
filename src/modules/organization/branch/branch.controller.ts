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
import { CreateBranchBody } from './dtos/create-branch-body';
import { UpdateBranchBody } from './dtos/update-branch-body';
import { findBranchFilters } from './dtos/find-branch-filters';
import { BranchService } from 'src/services/domains/branch.service';

@Controller('franchises/branches')
export class BranchController {
  constructor(private branchService: BranchService) {}

  @Get()
  async findAllBranches(
    @AccessValidator() validateAccess: accessValidator,
    @Body() body: findBranchFilters,
  ): Promise<Branch[]> {
    validateAccess('findAllBranches');
    return this.branchService.findAll(body);
  }

  @Get('/:id')
  async findBranchById(
    @AccessValidator() validateAccess: accessValidator,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    validateAccess('findBranchById');
    const branch = await this.branchService.findById(id);

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

    const branch = await this.branchService.create(body);

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

    const branch = await this.branchService.update(id, body);

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
    const branch = await this.branchService.delete(id);

    const status = branch ? 200 : 404;
    res.status(status).send('Branch successfully deleted');
  }
}

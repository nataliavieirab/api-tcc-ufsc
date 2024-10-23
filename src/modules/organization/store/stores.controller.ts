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
import { CreateStoreBody } from './dtos/create-store-body';
import { UpdateStoreBody } from './dtos/update-store-body';
import { FindStoreFilters } from './dtos/find-store-filters';
import { StoreService } from 'src/services/domains/store.service';
import { Store } from 'src/entities/store.entity';
import { EntityPagination } from 'src/utils/entity-pagination.type';
import { DefaultController } from 'src/modules/default.controller';
import { Actions } from 'src/services/permissions/permissions';

@Controller('organization/stores')
export class StoresController extends DefaultController {
  constructor(private storeService: StoreService) {
    super();
  }

  module = 'organization';

  @Get()
  async findAllStore(
    @Body() body: FindStoreFilters,
  ): Promise<EntityPagination<Store>> {
    await this.validateAccess(Actions.findStores);
    return this.storeService.findAll(body);
  }

  @Get('/:id')
  async findStoreById(@Param('id') id: string, @Res() res: any) {
    await this.validateAccess(Actions.findStores);
    const store = await this.storeService.findById(id);

    res.status(200).send(store);
  }

  @Post()
  async createStore(@Body() body: CreateStoreBody, @Res() res: any) {
    await this.validateAccess(Actions.createStore);

    const store = await this.storeService.create(body);

    res.status(201).send(store);
  }

  @Put('/:id')
  async updateStore(
    @Body() body: UpdateStoreBody,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    await this.validateAccess(Actions.updateStore);

    const store = await this.storeService.update(id, body);

    res.status(200).send(store);
  }

  @Delete('/:id')
  async deleteStore(@Param('id') id: string, @Res() res: any) {
    await this.validateAccess(Actions.deleteStore);
    await this.storeService.delete(id);

    res.status(204).send('Store successfully deleted');
  }
}

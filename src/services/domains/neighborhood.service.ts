import { Injectable } from '@nestjs/common';
import { NeighborhoodRepository } from 'src/repositories/neighborhood.repository';
import { EntityDefaultService } from './entity-default.service';
import { Neighborhood } from 'src/entities/neighborhood.entity';

@Injectable()
export class NeighborhoodService extends EntityDefaultService<Neighborhood> {
  constructor(neighborhoodRepository: NeighborhoodRepository) {
    super(neighborhoodRepository);
  }
}

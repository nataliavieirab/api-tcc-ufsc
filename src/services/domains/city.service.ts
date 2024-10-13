import { Injectable } from '@nestjs/common';
import { CityRepository } from 'src/repositories/city.repository';
import { EntityDefaultService } from './entity-default.service';
import { City } from 'src/entities/city.entity';

@Injectable()
export class CityService extends EntityDefaultService<City> {
  constructor(cityRepository: CityRepository) {
    super(cityRepository);
  }
}

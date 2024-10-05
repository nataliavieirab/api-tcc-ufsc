import { Injectable } from '@nestjs/common';
import { CompanyRepository } from 'src/repositories/company.repository';
import { EntityDefaultService } from './entity-default.service';
import { Company } from 'src/entities/company.entity';

@Injectable()
export class CompanyService extends EntityDefaultService<Company> {
  constructor(companyRepository: CompanyRepository) {
    super(companyRepository);
  }
}

import { DefaultRepository } from './default.repository';
import { Organization } from 'src/entities/organization.entity';

export class OrganizationRepository extends DefaultRepository<Organization> {
  constructor() {
    super(Organization);
  }
}

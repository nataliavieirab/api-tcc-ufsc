import { AfterBootstrapCallbacks } from 'src/after-bootstrap-callbacks';
import { OrganizationRepository } from 'src/repositories/organization.repository';
import { CurrentRequestService } from 'src/services/application/current-request.service';
import { TenantService } from 'src/services/application/tenant.service';
import { DependenciesResolver } from 'src/utils/dependencies-resolver';
import { DataSource } from 'typeorm';

AfterBootstrapCallbacks.registerCallback(async () => {
  const currentRequestService: CurrentRequestService =
    DependenciesResolver.getResolvedDependency(CurrentRequestService);

  const dataSource: DataSource =
    DependenciesResolver.getResolvedDependency(DataSource);

  await dataSource.initialize();

  currentRequestService.openScope(async () => {
    const queryRunner = dataSource.createQueryRunner();

    currentRequestService.setCurrentQueryRunner(queryRunner);

    const organizationRepository: OrganizationRepository =
      DependenciesResolver.getResolvedDependency(OrganizationRepository);

    const tenantService: TenantService =
      DependenciesResolver.getResolvedDependency(TenantService);

    const organizations = await organizationRepository.getMany({
      skipAccessFilter: true,
    });

    for (const organization of organizations) {
      await tenantService.migrateTenant(organization.id);
    }
  });
});

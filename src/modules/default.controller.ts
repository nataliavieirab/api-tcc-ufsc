import { PermissionService } from 'src/services/permissions/permission.service';

export class DefaultController {
  protected validateAccess(action: string) {
    // const permissionService = new PermissionService(user);
    // const hasAccess =
    //   permissionService.validateAction(action) &&
    //   permissionService.validateModuleAccess(module);
    // if (!hasAccess) {
    //   throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // }
  }
}

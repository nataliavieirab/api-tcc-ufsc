import { ForbiddenError } from 'src/errors/forbidden.error';
import { PermissionService } from 'src/services/permissions/permission.service';

export abstract class DefaultController {
  abstract module: string;

  protected async validateAccess(action: string) {
    const permissionService = new PermissionService();

    const hasAccess = await permissionService.validateAction(
      action,
      this.module,
    );

    if (!hasAccess) {
      throw new ForbiddenError();
    }
  }
}

import { PermissionService } from 'src/services/permissions/permission.service';
import { CurrentUser } from '../auth/decorators/current-users.decorator';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from '@prisma/client';
import { actions } from 'src/services/permissions/permissions';

export class AdminController {
  validateUserAccess(@CurrentUser() currentUser: User, action: actions) {
    const permissionService = new PermissionService();
    const hasAccess = permissionService.validateAccess(currentUser, action);
    if (!hasAccess) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}

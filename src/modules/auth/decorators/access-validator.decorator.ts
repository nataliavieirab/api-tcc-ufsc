import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthRequest } from '../models/AuthRequest';
import { PermissionService } from 'src/services/permissions/permission.service';
import { actions } from 'src/services/permissions/permissions';

export const AccessValidator = createParamDecorator(
  (data: unknown, context: ExecutionContext): ((action: actions) => void) => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    const module = request.url.split('/')[1];

    return (action: actions) => {
      const permissionService = new PermissionService(request.user);
      const hasAccess =
        permissionService.validateAction(action) &&
        permissionService.validateModuleAccess(module);

      if (!hasAccess) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    };
  },
);

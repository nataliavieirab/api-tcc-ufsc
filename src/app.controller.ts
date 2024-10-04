import { Controller } from '@nestjs/common';
import { CurrentUser } from './modules/auth/decorators/current-users.decorator';

@Controller()
export class AppController {
  getMe(@CurrentUser() currentUser: User) {
    return currentUser;
  }
}

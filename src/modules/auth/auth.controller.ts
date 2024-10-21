import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from 'src/services/domains/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { CurrentRequestService } from 'src/services/application/current-request.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private currentRequestService: CurrentRequestService,
  ) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user, req.orgId);
  }

  @Get('me')
  async getMe() {
    return (
      this.currentRequestService.getCurrentUser() ||
      this.currentRequestService.getCurrentCustomer()
    );
  }
}

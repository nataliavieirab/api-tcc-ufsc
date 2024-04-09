import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}

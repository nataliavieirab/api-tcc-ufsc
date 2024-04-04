import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SessionService {
  private readonly sessionTimeout: number;

  constructor(private readonly configService: ConfigService) {
    this.sessionTimeout = this.configService.get<number>('SESSION_TIMEOUT');
  }

  // Other methods and logic for session management...
}

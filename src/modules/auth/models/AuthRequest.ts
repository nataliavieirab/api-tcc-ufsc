// Estrutura de uma requisição que foi autenticada.

import { User } from 'src/entities/user.entity';

export interface AuthRequest extends Request {
  user: User;
  orgId?: string;
}

// Estrutura de uma requisição que foi autenticada.

import { User } from '@prisma/client';

export interface AuthRequest extends Request {
  user: User;
}

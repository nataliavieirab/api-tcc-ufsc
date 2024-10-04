// Estrutura de uma requisição que foi autenticada.

export interface AuthRequest extends Request {
  user: User;
}

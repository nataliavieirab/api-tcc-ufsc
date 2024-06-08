import { Franchise, UserRole } from '@prisma/client';

export class User {
  id: string;
  name: string;
  last_name: string;
  birth_date: Date;
  cpf: string;
  email: string;
  password: string;
  user_name: string;
  role: UserRole;
  franchise?: Franchise;
}

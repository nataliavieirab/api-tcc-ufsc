import { Prisma } from '.prisma/client';
import { UserRole } from '.prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  id: string;
  name: string;
  last_name: string;
  birth_date: number;
  cpf: string;
  password: string;
  user_name: string;
  roles: UserRole[];
}

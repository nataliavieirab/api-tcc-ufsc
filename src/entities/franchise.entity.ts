import { User } from '@prisma/client';
import { IsInt } from 'class-validator';

export class Franchise {
  id: string;
  name: string;
  cnpj: string;
  address: string;
  @IsInt()
  number: number;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  phone: string;
  email: string;
  adm_id: string;
  adm: User;
}

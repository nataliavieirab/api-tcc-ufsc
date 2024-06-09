import { Franchise } from '@prisma/client';
import { IsInt } from 'class-validator';

export class Organization {
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
  franchise: Franchise;
}

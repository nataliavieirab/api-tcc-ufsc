import { UserRole } from '.prisma/client';
import { IsArray, IsString } from 'class-validator';

export class findUsersFilters {
  @IsString()
  readonly name?: string;

  @IsString()
  readonly last_name?: string;

  @IsString()
  readonly cpf?: string;

  @IsString()
  readonly user_name?: string;

  @IsArray()
  readonly roles?: UserRole[];
}

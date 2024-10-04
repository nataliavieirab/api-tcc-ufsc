import { IsOptional, IsString } from 'class-validator';

export class findUsersFilters {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly last_name?: string;

  @IsOptional()
  @IsString()
  readonly cpf?: string;

  @IsOptional()
  @IsString()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly user_name?: string;

  @IsOptional()
  readonly role?: UserRole;
}

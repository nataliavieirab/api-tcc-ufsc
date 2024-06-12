import { IsOptional, IsString } from 'class-validator';

export class findOrganizationFilters {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly cnpj: string;

  @IsString()
  @IsOptional()
  readonly city: string;

  @IsString()
  @IsOptional()
  readonly state: string;

  @IsString()
  @IsOptional()
  readonly zip_code: string;

  @IsString()
  @IsOptional()
  readonly phone: string;

  @IsString()
  @IsOptional()
  readonly email: string;
}

import { IsInt, IsOptional, IsString, Length } from 'class-validator';

export class UpdateBranchBody {
  @IsString()
  @Length(2, 50)
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly cnpj: string;

  @IsString()
  @Length(5, 100)
  @IsOptional()
  readonly address: string;

  @IsInt()
  @IsOptional()
  readonly number: number;

  @IsString()
  @IsOptional()
  readonly complement: string;

  @IsString()
  @Length(8, 50)
  @IsOptional()
  readonly neighborhood: string;

  @IsString()
  @Length(5, 50)
  @IsOptional()
  readonly city: string;

  @IsString()
  @IsOptional()
  readonly state: string;

  @IsString()
  @IsOptional()
  readonly country: string;

  @IsString()
  @IsOptional()
  readonly zip_code: string;

  @IsString()
  @IsOptional()
  readonly phone: string;

  @IsString()
  @IsOptional()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly franchise_id: string;

  @IsString()
  @IsOptional()
  readonly manager_id: string;
}

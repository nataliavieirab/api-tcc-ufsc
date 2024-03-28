import { IsString } from 'class-validator';

export class findFranchisesFilters {
  @IsString()
  readonly name: string;

  @IsString()
  readonly cnpj: string;

  @IsString()
  readonly city: string;

  @IsString()
  readonly state: string;

  @IsString()
  readonly zip_code: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly adm_id: string;
}

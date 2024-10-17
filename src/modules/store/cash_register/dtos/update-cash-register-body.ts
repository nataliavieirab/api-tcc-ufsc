import { IsDate, IsOptional } from 'class-validator';

export class UpdateCashRegisterBody {
  @IsOptional()
  @IsDate()
  readonly openingDate?: Date;

  @IsOptional()
  @IsDate()
  readonly closingDate?: Date;
}

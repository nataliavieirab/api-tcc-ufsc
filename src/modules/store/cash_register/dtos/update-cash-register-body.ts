import { IsDateString, IsOptional } from 'class-validator';

export class UpdateCashRegisterBody {
  @IsOptional()
  @IsDateString()
  readonly openingDate?: Date;

  @IsOptional()
  @IsDateString()
  readonly closingDate?: Date;
}

import { IsDateString, IsOptional } from 'class-validator';

export class CreateCashRegisterBody {
  @IsOptional()
  @IsDateString()
  readonly openingDate?: Date;

  @IsOptional()
  @IsDateString()
  readonly closingDate?: Date;
}

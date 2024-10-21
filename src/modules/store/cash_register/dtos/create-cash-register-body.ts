import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCashRegisterBody {
  @IsString()
  @IsNotEmpty()
  readonly storeId: string;

  @IsOptional()
  @IsDate()
  readonly openingDate?: Date;

  @IsOptional()
  @IsDate()
  readonly closingDate?: Date;
}

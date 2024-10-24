import { IsDateString, IsOptional, IsString } from 'class-validator';

export class FindCashRegistersFilters {
  @IsOptional()
  @IsString()
  readonly responsibleUserId?: string;

  @IsOptional()
  @IsDateString()
  readonly before_openingDate?: Date;

  @IsOptional()
  @IsDateString()
  readonly after_openingDate?: Date;

  @IsOptional()
  @IsDateString()
  readonly before_closingDate?: Date;

  @IsOptional()
  @IsDateString()
  readonly after_closingDate?: Date;
}

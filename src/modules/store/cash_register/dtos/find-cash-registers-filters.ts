import { IsDate, IsOptional, IsString } from 'class-validator';

export class FindCashRegistersFilters {
  @IsOptional()
  @IsString()
  readonly responsibleUserId?: string;

  @IsOptional()
  @IsDate()
  readonly before_openingDate?: Date;

  @IsOptional()
  @IsDate()
  readonly before_closingDate?: Date;

  @IsOptional()
  @IsDate()
  readonly after_closingDate?: Date;

  @IsOptional()
  @IsDate()
  readonly after_openingDate?: Date;
}

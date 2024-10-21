import { IsDate, IsOptional, IsString } from 'class-validator';

export class FindOrdersFilters {
  @IsOptional()
  @IsString()
  cashRegisterId?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDate()
  before_date?: Date;

  @IsOptional()
  @IsDate()
  after_date?: Date;
}

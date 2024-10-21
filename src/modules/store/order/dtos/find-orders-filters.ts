import { IsDate, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'src/entities/order.entity';

export class FindOrdersFilters {
  @IsOptional()
  @IsString()
  cashRegisterId?: string;

  @IsOptional()
  @IsString()
  status?: OrderStatus;

  @IsOptional()
  @IsDate()
  before_date?: Date;

  @IsOptional()
  @IsDate()
  after_date?: Date;
}

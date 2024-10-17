import { IsArray, IsDate, IsOptional } from 'class-validator';
import { OrderStatus } from 'src/entities/order.entity';

export class FindOrdersFilters {
  @IsOptional()
  @IsDate()
  readonly before_date?: Date;

  @IsOptional()
  @IsDate()
  readonly after_date?: Date;

  @IsOptional()
  @IsArray()
  status: OrderStatus;
}

import { IsOptional, IsString } from 'class-validator';
import { ProductSetStatus } from 'src/entities/product-set.entity';

export class FindProductSetsFilters {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly like_name?: string;

  @IsOptional()
  @IsString()
  readonly status?: ProductSetStatus;
}

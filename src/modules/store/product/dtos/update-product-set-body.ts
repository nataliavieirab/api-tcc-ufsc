import { IsOptional, IsString } from 'class-validator';
import { ProductSetStatus } from 'src/entities/product-set.entity';
import { HasValidValue } from 'src/validators/has-valid-value.validator';

export class UpdateProductSetBody {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @HasValidValue(Object.values(ProductSetStatus), {
    message: 'Invalid status.',
  })
  status?: ProductSetStatus;
}

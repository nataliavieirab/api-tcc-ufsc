import { ProductSetStatus } from 'src/entities/product-set.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { HasValidValue } from 'src/validators/has-valid-value.validator';

export class CreateProductSetBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty({ message: 'The user role should not be empty.' })
  @HasValidValue(Object.values(ProductSetStatus), {
    message: 'Invalid status.',
  })
  status: ProductSetStatus;
}

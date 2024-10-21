import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { ProductOptionType } from 'src/entities/product-option.entity';
import { HasValidValue } from 'src/validators/has-valid-value.validator';

export class AddOptionsToProductBody {
  @IsString()
  @Length(2, 30)
  @IsNotEmpty({ message: 'The product option name should not be empty.' })
  readonly name: string;

  @IsNotEmpty()
  @HasValidValue(Object.values(ProductOptionType), {
    message: 'Invalid product type.',
  })
  readonly type: ProductOptionType;

  @IsBoolean()
  @IsNotEmpty()
  readonly required: boolean;

  @IsArray()
  readonly values: {
    name: string;
    value: string;
    price: number;
  }[];
}

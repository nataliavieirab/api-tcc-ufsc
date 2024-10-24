import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateProductBody {
  @IsString()
  @Length(2, 30)
  @IsNotEmpty({ message: 'The product name should not be empty.' })
  readonly name: string;

  @IsNumber()
  @IsOptional()
  readonly defaultPrice: number;
}

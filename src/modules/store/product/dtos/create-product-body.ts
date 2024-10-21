import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProductBody {
  @IsString()
  @IsNotEmpty()
  readonly storeId: string;

  @IsString()
  @Length(2, 30)
  @IsNotEmpty({ message: 'The product name should not be empty.' })
  readonly name: string;
}

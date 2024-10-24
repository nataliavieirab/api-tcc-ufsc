import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddItemToProductSetBody {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

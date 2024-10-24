import { IsNotEmpty, IsString } from 'class-validator';

export class AddItemToCategoryBody {
  @IsString()
  @IsNotEmpty()
  productId: string;
}

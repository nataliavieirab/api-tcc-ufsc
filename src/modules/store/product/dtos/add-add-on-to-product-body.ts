import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddAddOnToProductBody {
  @IsString()
  @IsNotEmpty()
  readonly addOnId: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
}

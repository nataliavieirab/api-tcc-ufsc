import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddNeighborhoodBody {
  @IsString()
  @IsNotEmpty()
  readonly neighborhoodName: string;

  @IsString()
  @IsNotEmpty()
  readonly neighborhoodCode: string;

  @IsNumber()
  @IsNotEmpty()
  readonly deliveryFee: number;
}

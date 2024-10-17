import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAddressBody {
  @IsString()
  @IsNotEmpty()
  readonly street: string;

  @IsString()
  @IsNotEmpty()
  readonly number: string;

  @IsString()
  @IsOptional()
  readonly complement: string;

  @IsString()
  @IsNotEmpty()
  readonly zipCode: string;

  @IsString()
  @IsNotEmpty()
  readonly neighborhoodCode: string;
}

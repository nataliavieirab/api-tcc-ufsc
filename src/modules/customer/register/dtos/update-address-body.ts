import { IsOptional, IsString } from 'class-validator';

export class UpdateAddressBody {
  @IsString()
  @IsOptional()
  readonly street: string;

  @IsString()
  @IsOptional()
  readonly number: string;

  @IsString()
  @IsOptional()
  readonly complement: string;

  @IsString()
  @IsOptional()
  readonly zipCode: string;

  @IsString()
  @IsOptional()
  readonly neighborhoodCode: string;
}

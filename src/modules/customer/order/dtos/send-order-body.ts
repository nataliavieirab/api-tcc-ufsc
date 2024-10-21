import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendOrderBody {
  @IsString()
  @IsNotEmpty()
  addressId: string;

  @IsString()
  @IsNotEmpty()
  bagId: string;

  @IsString()
  @IsOptional()
  observation: string;
}

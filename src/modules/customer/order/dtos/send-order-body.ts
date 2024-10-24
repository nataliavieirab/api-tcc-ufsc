import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendOrderBody {
  @IsString()
  @IsNotEmpty()
  addressId: string;

  @IsString()
  @IsNotEmpty()
  preferredPaymentTypeId: string;

  @IsString()
  @IsOptional()
  observation?: string;
}

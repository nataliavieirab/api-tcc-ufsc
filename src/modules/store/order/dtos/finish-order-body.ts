import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class OrderPaymentInputDto {
  @IsNotEmpty()
  @IsString()
  paymentTypeId: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}

export class FinishOrderBody {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderPaymentInputDto)
  payments: OrderPaymentInputDto[];
}

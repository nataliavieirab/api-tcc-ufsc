import { IsOptional, IsString } from 'class-validator';
import { SystemPaymentType } from 'src/entities/payment-type.entity';
import { HasValidValue } from 'src/validators/has-valid-value.validator';

export class UpdatePaymentTypeBody {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  @HasValidValue(Object.values(SystemPaymentType), {
    message: 'Invalid payment type.',
  })
  type: SystemPaymentType;
}

import { IsNotEmpty, IsString } from 'class-validator';
import { SystemPaymentType } from 'src/entities/payment-type.entity';
import { HasValidValue } from 'src/validators/has-valid-value.validator';

export class CreatePaymentTypeBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @HasValidValue(Object.values(SystemPaymentType), {
    message: 'Invalid payment type.',
  })
  type: SystemPaymentType;
}

import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliverySettingsBody {
  @IsString()
  @IsNotEmpty()
  storeId: string;

  @IsDateString()
  @IsNotEmpty()
  startHour: Date;

  @IsDateString()
  @IsNotEmpty()
  endHour: Date;
}

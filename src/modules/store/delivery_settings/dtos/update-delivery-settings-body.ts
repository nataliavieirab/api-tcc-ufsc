import { IsDateString, IsOptional } from 'class-validator';

export class UpdateDeliverySettingsBody {
  @IsDateString()
  @IsOptional()
  startHour: Date;

  @IsDateString()
  @IsOptional()
  endHour: Date;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class AcceptOrderBody {
  @IsNotEmpty()
  @IsString()
  cashRegisterId: string;
}

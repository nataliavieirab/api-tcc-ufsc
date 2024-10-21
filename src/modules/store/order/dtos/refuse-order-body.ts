import { IsNotEmpty, IsString } from 'class-validator';

export class RefuseOrderBody {
  @IsNotEmpty()
  @IsString()
  cashRegisterId: string;
}

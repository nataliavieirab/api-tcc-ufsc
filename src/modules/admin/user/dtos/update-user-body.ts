import { IsString, Length } from 'class-validator';

export class UpdateUserBody {
  @IsString()
  @Length(2, 30)
  readonly userName?: string;
}

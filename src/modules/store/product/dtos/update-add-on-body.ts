import { IsString, Length } from 'class-validator';

export class UpdateAddOnBody {
  @IsString()
  @Length(2, 30)
  readonly name: string;
}

import { IsString, Length } from 'class-validator';

export class UpdateProductBody {
  @IsString()
  @Length(2, 30)
  readonly name: string;
}

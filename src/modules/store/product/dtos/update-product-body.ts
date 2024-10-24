import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateProductBody {
  @IsString()
  @IsOptional()
  @Length(2, 30)
  readonly name: string;

  @IsNumber()
  @IsOptional()
  readonly defaultPrice: number;
}

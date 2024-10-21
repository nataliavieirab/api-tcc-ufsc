import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateStoreBody {
  @IsString()
  @Length(2, 50)
  @IsOptional()
  readonly name: string;
}

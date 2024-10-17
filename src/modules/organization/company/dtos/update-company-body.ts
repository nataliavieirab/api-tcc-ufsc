import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateCompanyBody {
  @IsString()
  @Length(2, 50)
  @IsOptional()
  readonly name: string;
}

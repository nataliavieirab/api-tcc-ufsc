import { IsOptional, IsString } from 'class-validator';

export class FindCompanyFilters {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly like_name: string;
}

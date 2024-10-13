import { IsOptional, IsString } from 'class-validator';

export class findOrgsFilters {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly like_name?: string;

  @IsOptional()
  @IsString()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly like_email?: string;
}

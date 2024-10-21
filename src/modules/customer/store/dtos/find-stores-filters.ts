import { IsOptional, IsString } from 'class-validator';

export class FindStoresFilters {
  @IsOptional()
  @IsString()
  like_name?: string;

  @IsOptional()
  @IsString()
  name?: string;
}

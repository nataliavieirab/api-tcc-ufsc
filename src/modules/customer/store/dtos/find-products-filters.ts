import { IsOptional, IsString } from 'class-validator';

export class FindProductsFilters {
  @IsOptional()
  @IsString()
  like_name?: string;

  @IsOptional()
  @IsString()
  name?: string;
}

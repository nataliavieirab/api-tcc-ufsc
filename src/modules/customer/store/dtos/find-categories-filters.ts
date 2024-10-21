import { IsOptional, IsString } from 'class-validator';

export class FindCategoriesFilters {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  like_name?: string;
}

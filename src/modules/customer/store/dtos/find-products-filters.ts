import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FindProductsFilters {
  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString()
  like_name?: string;

  @IsOptional()
  @IsString()
  name?: string;
}

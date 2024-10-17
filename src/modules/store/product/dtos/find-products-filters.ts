import { IsOptional, IsString } from 'class-validator';

export class FindProductsFilters {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly like_name?: string;
}

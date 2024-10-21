import { IsOptional, IsString } from 'class-validator';

export class findAllNeighborhoodsFilters {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly like_name?: string;

  @IsOptional()
  @IsString()
  readonly code?: string;

  @IsOptional()
  @IsString()
  readonly like_code?: string;
}

import { IsOptional, IsString } from 'class-validator';

export class FindStoreFilters {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly like_name: string;
}

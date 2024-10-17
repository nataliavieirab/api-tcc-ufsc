import { IsOptional, IsString } from 'class-validator';

export class FindUsersFilters {
  @IsOptional()
  @IsString()
  readonly userName?: string;

  @IsOptional()
  @IsString()
  readonly like_userName?: string;
}

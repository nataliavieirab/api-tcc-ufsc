import { IsOptional, IsString } from 'class-validator';

export class findUsersFilters {
  @IsOptional()
  @IsString()
  readonly userName?: string;

  @IsOptional()
  @IsString()
  readonly like_userName?: string;
}

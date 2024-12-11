import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateOrganizationBody {
  @IsString()
  @Length(2, 30)
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly email?: string;
}

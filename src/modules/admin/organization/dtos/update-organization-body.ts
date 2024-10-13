import { IsString, Length } from 'class-validator';

export class UpdateOrganizationBody {
  @IsString()
  @Length(2, 30)
  readonly name?: string;

  @IsString()
  readonly email?: string;
}

import { UserRole } from '.prisma/client';
import {
  IsDateString,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { HasValidValue } from 'src/validators/has-valid-value.validator';

const modulePermittedRoles: UserRole[] = [
  'GENERAL_ADM',
  'GENERAL_ASSISTANT',
  'ORGANIZATION_ADM',
  'ORGANIZATION_ASSISTANT',
];

export class UpdateUserBody {
  @IsString()
  @Length(2, 30)
  @IsOptional()
  readonly name: string;

  @IsString()
  @Length(5, 100)
  @IsOptional()
  readonly last_name: string;

  @IsDateString()
  @IsOptional()
  readonly birth_date: Date;

  @IsString()
  @IsOptional()
  readonly cpf: string;

  @IsString()
  @IsOptional()
  readonly email: string;

  @IsString()
  @Length(8, 24)
  @IsOptional()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password too weak.\n' +
      'The password must contain at least one digit or special character.\n' +
      'Cannot include dots or line breaks.\n' +
      'Must have at least one uppercase and one lowercase letter.\n' +
      'Should be between 5 and 50 characters in length.',
  })
  readonly password: string;

  @IsString()
  @Length(5, 50)
  @IsOptional()
  readonly user_name: string;

  @IsOptional()
  @HasValidValue(modulePermittedRoles, {
    message: 'Invalid role.',
  })
  readonly role: UserRole;
}

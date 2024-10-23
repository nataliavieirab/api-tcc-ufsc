import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { SystemRoles } from 'src/services/permissions/permissions';
import { HasValidValue } from 'src/validators/has-valid-value.validator';

const modulePermittedSystemRoles: SystemRoles[] = [
  SystemRoles.ORGANIZATION_ASSISTANT,
];

export class CreateUserBody {
  @IsString()
  @Length(2, 30)
  @IsNotEmpty({ message: 'The user name should not be empty.' })
  readonly userName: string;

  @IsString()
  @Length(8, 24)
  @IsNotEmpty({ message: 'The user password should not be empty.' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  readonly password: string;

  @IsArray()
  @IsOptional()
  readonly roles: string[];

  @IsOptional()
  @HasValidValue(modulePermittedSystemRoles, {
    message: 'Invalid roles.',
  })
  readonly systemRoles: SystemRoles[];
}

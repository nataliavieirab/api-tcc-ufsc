import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { SystemRole } from 'src/entities/user-role.entity';
import { HasValidValue } from 'src/validators/has-valid-value.validator';

const modulePermittedRoles: SystemRole[] = [SystemRole.SYSTEM_ASSISTANT];
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

  @IsNotEmpty({ message: 'The user role should not be empty.' })
  @HasValidValue(modulePermittedRoles, {
    message: 'Invalid roles.',
  })
  readonly systemRoles: SystemRole[];
}

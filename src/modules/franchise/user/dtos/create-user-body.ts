import { UserRole } from '.prisma/client';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { HasValidValue } from 'src/validators/has-valid-value.validator';

const modulePermittedRoles: UserRole[] = ['BRANCH_ADM'];
export class CreateUserBody {
  @IsString()
  @Length(2, 30)
  @IsNotEmpty({ message: 'The user name should not be empty.' })
  readonly name: string;

  @IsString()
  @Length(5, 100)
  @IsNotEmpty({ message: 'The user last name should not be empty.' })
  readonly last_name: string;

  @IsDateString()
  @IsNotEmpty({ message: 'The user birth date should not be empty.' })
  readonly birth_date: Date;

  @IsString()
  @IsNotEmpty({ message: 'The user cpf should not be empty.' })
  readonly cpf: string;

  @IsEmail()
  @IsNotEmpty({ message: 'The user email should not be empty.' })
  readonly email: string;

  @IsString()
  @Length(8, 24)
  @IsNotEmpty({ message: 'The user password should not be empty.' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  readonly password: string;

  @IsString()
  @Length(5, 50)
  @IsNotEmpty({ message: 'The user user_name should not be empty.' })
  readonly user_name: string;

  @IsNotEmpty({ message: 'The user role should not be empty.' })
  @HasValidValue(modulePermittedRoles, {
    message: 'Invalid role.',
  })
  readonly role: UserRole;
}

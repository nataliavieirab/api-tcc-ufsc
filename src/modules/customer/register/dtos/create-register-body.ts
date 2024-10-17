import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateRegisterBody {
  @IsString()
  @Length(2, 30)
  @IsNotEmpty()
  readonly name: string;

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
}

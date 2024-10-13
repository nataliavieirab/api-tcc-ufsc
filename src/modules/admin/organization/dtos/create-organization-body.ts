import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateOrganizationBody {
  @IsString()
  @Length(2, 30)
  @IsNotEmpty({ message: 'The organization name should not be empty.' })
  readonly name: string;

  @IsString()
  @IsNotEmpty({ message: 'The organization email should not be empty.' })
  readonly email: string;

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
  readonly userPassword: string;
}

import { UserRole } from '.prisma/client';
import { IsArray, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserBody {
  @IsString()
  @Length(2, 30)
  @IsNotEmpty({ message: 'The user name should not be empty.' })
  readonly name: string;

  @IsString()
  @Length(5, 100)
  @IsNotEmpty({ message: 'The user last name should not be empty.' })
  readonly last_name: string;

  @IsInt()
  @IsNotEmpty({ message: 'The user birth date should not be empty.' })
  readonly birth_date: number;

  @IsString()
  @IsNotEmpty({ message: 'The user cpf should not be empty.' })
  readonly cpf: string;

  @IsString()
  @Length(8, 50)
  @IsNotEmpty({ message: 'The user password should not be empty.' })
  readonly password: string;

  @IsString()
  @Length(5, 50)
  @IsNotEmpty({ message: 'The user user_name should not be empty.' })
  readonly user_name: string;

  @IsArray()
  @IsNotEmpty({ message: 'The user roles should not be empty.' })
  readonly roles: UserRole[];
}

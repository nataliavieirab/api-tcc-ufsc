import { UserRole } from '.prisma/client';
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

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
  readonly password: string;

  @IsString()
  @Length(5, 50)
  @IsOptional()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  readonly user_name: string;

  @IsArray()
  @IsOptional()
  readonly roles: UserRole[];
}

import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateUserBody {
  @IsString()
  @IsOptional()
  @Length(2, 30)
  readonly userName?: string;

  @IsString()
  @IsOptional()
  @Length(8, 24)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  readonly password: string;
}

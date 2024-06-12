import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateOrganizationBody {
  @IsString()
  @Length(2, 50)
  @IsNotEmpty({ message: 'The organization name should not be empty.' })
  readonly name: string;

  @IsString()
  @IsNotEmpty({ message: 'The organization cnpj should not be empty.' })
  readonly cnpj: string;

  @IsString()
  @Length(5, 100)
  @IsNotEmpty({ message: 'The organization address should not be empty.' })
  readonly address: string;

  @IsInt()
  @IsNotEmpty({ message: 'The organization number should not be empty.' })
  readonly number: number;

  @IsString()
  @IsNotEmpty({ message: 'The organization complement should not be empty.' })
  readonly complement: string;

  @IsString()
  @Length(8, 50)
  @IsNotEmpty({ message: 'The organization neighborhood should not be empty.' })
  readonly neighborhood: string;

  @IsString()
  @Length(5, 50)
  @IsNotEmpty({ message: 'The organization city should not be empty.' })
  readonly city: string;

  @IsString()
  @IsNotEmpty({ message: 'The organization state should not be empty.' })
  readonly state: string;

  @IsString()
  @IsNotEmpty({ message: 'The organization country should not be empty.' })
  readonly country: string;

  @IsString()
  @IsNotEmpty({ message: 'The organization zip_code should not be empty.' })
  readonly zip_code: string;

  @IsString()
  @IsNotEmpty({ message: 'The organization phone should not be empty.' })
  readonly phone: string;

  @IsString()
  @IsNotEmpty({ message: 'The organization email should not be empty.' })
  readonly email: string;
}

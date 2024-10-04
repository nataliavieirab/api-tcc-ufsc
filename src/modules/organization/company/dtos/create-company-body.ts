import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateCompanyBody {
  @IsString()
  @Length(2, 50)
  @IsNotEmpty({ message: 'The company name should not be empty.' })
  readonly name: string;

  @IsString()
  @IsNotEmpty({ message: 'The company cnpj should not be empty.' })
  readonly cnpj: string;

  @IsString()
  @Length(5, 100)
  @IsNotEmpty({ message: 'The company address should not be empty.' })
  readonly address: string;

  @IsInt()
  @IsNotEmpty({ message: 'The company number should not be empty.' })
  readonly number: number;

  @IsString()
  @IsOptional()
  readonly complement: string;

  @IsString()
  @Length(1, 50)
  @IsNotEmpty({ message: 'The company neighborhood should not be empty.' })
  readonly neighborhood: string;

  @IsString()
  @Length(1, 50)
  @IsNotEmpty({ message: 'The company city should not be empty.' })
  readonly city: string;

  @IsString()
  @IsNotEmpty({ message: 'The company state should not be empty.' })
  readonly state: string;

  @IsString()
  @IsNotEmpty({ message: 'The company country should not be empty.' })
  readonly country: string;

  @IsString()
  @IsNotEmpty({ message: 'The company zip_code should not be empty.' })
  readonly zip_code: string;

  @IsString()
  @IsNotEmpty({ message: 'The company phone should not be empty.' })
  readonly phone: string;

  @IsString()
  @IsNotEmpty({ message: 'The company email should not be empty.' })
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly manager_id: string;
}

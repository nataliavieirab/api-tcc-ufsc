import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateBranchBody {
  @IsString()
  @Length(2, 50)
  @IsNotEmpty({ message: 'The branch name should not be empty.' })
  readonly name: string;

  @IsString()
  @IsNotEmpty({ message: 'The branch cnpj should not be empty.' })
  readonly cnpj: string;

  @IsString()
  @Length(5, 100)
  @IsNotEmpty({ message: 'The branch address should not be empty.' })
  readonly address: string;

  @IsInt()
  @IsNotEmpty({ message: 'The branch number should not be empty.' })
  readonly number: number;

  @IsString()
  @IsOptional()
  readonly complement: string;

  @IsString()
  @Length(1, 50)
  @IsNotEmpty({ message: 'The branch neighborhood should not be empty.' })
  readonly neighborhood: string;

  @IsString()
  @Length(1, 50)
  @IsNotEmpty({ message: 'The branch city should not be empty.' })
  readonly city: string;

  @IsString()
  @IsNotEmpty({ message: 'The branch state should not be empty.' })
  readonly state: string;

  @IsString()
  @IsNotEmpty({ message: 'The branch country should not be empty.' })
  readonly country: string;

  @IsString()
  @IsNotEmpty({ message: 'The branch zip_code should not be empty.' })
  readonly zip_code: string;

  @IsString()
  @IsNotEmpty({ message: 'The branch phone should not be empty.' })
  readonly phone: string;

  @IsString()
  @IsNotEmpty({ message: 'The branch email should not be empty.' })
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly franchise_id: string;

  @IsString()
  @IsOptional()
  readonly manager_id: string;
}

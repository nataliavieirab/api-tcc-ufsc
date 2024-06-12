import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateFranchiseBody {
  @IsString()
  @Length(2, 50)
  @IsNotEmpty({ message: 'The franchise name should not be empty.' })
  readonly name: string;

  @IsString()
  @IsNotEmpty({ message: 'The franchise cnpj should not be empty.' })
  readonly cnpj: string;

  @IsString()
  @Length(5, 100)
  @IsNotEmpty({ message: 'The franchise address should not be empty.' })
  readonly address: string;

  @IsInt()
  @IsNotEmpty({ message: 'The franchise number should not be empty.' })
  readonly number: number;

  @IsString()
  @IsNotEmpty({ message: 'The franchise complement should not be empty.' })
  readonly complement: string;

  @IsString()
  @Length(8, 50)
  @IsNotEmpty({ message: 'The franchise neighborhood should not be empty.' })
  readonly neighborhood: string;

  @IsString()
  @Length(5, 50)
  @IsNotEmpty({ message: 'The franchise city should not be empty.' })
  readonly city: string;

  @IsString()
  @IsNotEmpty({ message: 'The franchise state should not be empty.' })
  readonly state: string;

  @IsString()
  @IsNotEmpty({ message: 'The franchise country should not be empty.' })
  readonly country: string;

  @IsString()
  @IsNotEmpty({ message: 'The franchise zip_code should not be empty.' })
  readonly zip_code: string;

  @IsString()
  @IsNotEmpty({ message: 'The franchise phone should not be empty.' })
  readonly phone: string;

  @IsString()
  @IsNotEmpty({ message: 'The franchise email should not be empty.' })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: 'The franchise adm_id should not be empty.' })
  readonly adm_id: string;

  @IsString()
  @IsNotEmpty({ message: 'The franchise organization_id should not be empty.' })
  readonly organization_id: string;
}

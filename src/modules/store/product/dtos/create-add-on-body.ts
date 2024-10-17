import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAddOnBody {
  @IsString()
  @IsNotEmpty()
  readonly companyId: string;

  @IsString()
  @Length(2, 30)
  @IsNotEmpty({ message: 'The add on name should not be empty.' })
  readonly name: string;
}

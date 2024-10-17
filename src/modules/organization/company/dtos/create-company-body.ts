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
}

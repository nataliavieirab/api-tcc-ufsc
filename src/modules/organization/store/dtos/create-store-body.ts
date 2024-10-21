import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateStoreBody {
  @IsString()
  @Length(2, 50)
  @IsNotEmpty({ message: 'The store name should not be empty.' })
  readonly name: string;
}

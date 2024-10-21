import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryBody {
  @IsString()
  @IsNotEmpty()
  storeId: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

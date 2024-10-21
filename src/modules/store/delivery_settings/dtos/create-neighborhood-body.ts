import { IsNotEmpty, IsString } from 'class-validator';

export class AddNeighborhoodBody {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly code: string;
}

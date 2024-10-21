import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class BagItemOptionEntryDto {
  @IsString()
  @IsNotEmpty()
  productOptionId: string;

  @IsString()
  @IsOptional()
  optionValueId?: string;

  @IsString()
  @IsOptional()
  rawValue?: string;
}

class BagItemAddOnEntryDto {
  @IsString()
  @IsNotEmpty()
  productAddOnId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class AddItemToBagBody {
  @IsString()
  @IsNotEmpty()
  productSetItemId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BagItemOptionEntryDto)
  @IsOptional()
  options?: BagItemOptionEntryDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BagItemAddOnEntryDto)
  @IsOptional()
  addOns?: BagItemAddOnEntryDto[];
}

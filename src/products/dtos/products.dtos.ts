import { IsString, IsNumber, IsNotEmpty, IsPositive, IsMongoId } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
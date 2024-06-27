import { IsNumber, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(8, 20)
  readonly name: string;

  @IsNumber()
  readonly price: number;
}

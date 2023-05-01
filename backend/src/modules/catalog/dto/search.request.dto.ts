import { IsNumber, IsString, ValidateIf } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class searchRequestDto {
  @IsNumber()
  @ValidateIf((v) => v.size !== undefined || v.page)
  @Transform(
    (value: TransformFnParams) => value.value && parseInt(value.value, 10),
  )
  page: number;

  @IsNumber()
  @ValidateIf((v) => v.page !== undefined || v.size)
  @Transform(
    (value: TransformFnParams) => value.value && parseInt(value.value, 10),
  )
  size: number;

  @IsString()
  @ValidateIf((v) => v.sort !== undefined)
  sort: string;

  @IsString()
  @ValidateIf((v) => v.search !== undefined)
  search: string;
}

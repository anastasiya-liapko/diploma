import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class PatchCartRequestDto {
  @ApiProperty()
  @IsNumber()
  @Transform(
    (value: TransformFnParams) => value.value && parseInt(value.value, 10),
  )
  count: number;

  @ApiProperty()
  @IsString()
  _id: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class ErrorData {
  @ApiProperty()
  code: number;

  @ApiProperty()
  @Type(() => ErrorInfo)
  info: ErrorInfo;
}

class ErrorInfo {
  @ApiProperty()
  message: string;
}

export class ErrorDto {
  @ApiProperty()
  @Type(() => ErrorData)
  error: ErrorData;
}

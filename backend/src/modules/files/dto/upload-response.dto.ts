import { ApiProperty } from '@nestjs/swagger';

export class uploadResponseDto {
    @ApiProperty()
    uploaded: boolean;
}
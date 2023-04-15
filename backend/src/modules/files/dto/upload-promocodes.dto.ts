import { ApiProperty } from '@nestjs/swagger';

export class uploadPromocodesDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
}
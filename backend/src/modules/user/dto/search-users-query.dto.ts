import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class SearchUsersQueryDto {
  @IsNotEmpty()
  page: string;

  @IsNotEmpty()
  limit: string;
}

import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadRequestDto } from './dto/upload.request.dto';
import { UploadResponseDto } from './dto/upload.response.dto';
import { BasicAuthGuard } from 'src/guards/basic-auth.guard';

@ApiTags('Files')
@ApiBearerAuth()
@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) { }

  @Post('/upload')
  @UseGuards(BasicAuthGuard)
  @ApiOperation({
    summary: 'Загрузка каталога в формате .xls',
  })
  @ApiBody({
    type: UploadRequestDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    description: 'Каталог загружен',
    type: UploadResponseDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    try {
      return await this.filesService.upload(file);
    } catch (e) {
      throw e;
    }
  }
}

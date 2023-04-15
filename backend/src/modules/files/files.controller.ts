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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { uploadDto } from './dto/upload.dto';
import { uploadPromocodesDto } from './dto/upload-promocodes.dto';
import { uploadResponseDto } from './dto/upload-response.dto';

@ApiTags('Files')
@ApiBearerAuth()
@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('/upload')
  async upload(@UploadedFiles() files) {
    console.log('upload');
    try {
      return await this.filesService.upload(files);
    } catch (e) {
      throw e;
    }
  }
  //   @Post('/upload')
  //   @ApiOperation({
  //     summary: 'Загрузка каталога сертификатов в формате .xls и картинок',
  //   })
  //   @ApiBody({
  //     type: uploadDto,
  //   })
  //   @ApiConsumes('multipart/form-data')
  //   @ApiOkResponse({
  //     description: 'Сертификаты и картинки загружены',
  //     type: uploadResponseDto,
  //   })
  //   @UseInterceptors(
  //     FileFieldsInterceptor([
  //       { name: 'file', maxCount: 1 },
  //       { name: 'images', maxCount: Infinity },
  //     ]),
  //   )
  //   async upload(@UploadedFiles() files) {
  //     try {
  //       return await this.filesService.upload(files);
  //     } catch (e) {
  //       throw e;
  //     }
  //   }
  //   @Post('/upload/promocodes')
  //   @ApiOperation({ summary: 'Загрузка промокодов в формате .xls' })
  //   @ApiBody({
  //     type: uploadPromocodesDto,
  //   })
  //   @ApiConsumes('multipart/form-data')
  //   @ApiOkResponse({
  //     description: 'Промокоды загружены',
  //     type: uploadResponseDto,
  //   })
  //   @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
  //   async uploadPromocodes(@UploadedFiles() file) {
  //     try {
  //       return await this.filesService.uploadPromocodes(file);
  //     } catch (e) {
  //       throw e;
  //     }
  //   }
}

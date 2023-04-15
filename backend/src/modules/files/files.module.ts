import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      //   { name: 'Card', schema: CardSchema },
      //   { name: 'Certificate', schema: CertificateSchema },
      //   { name: 'Point', schema: PointSchema },
      //   { name: 'Sold', schema: SoldSchema },
      //   { name: 'Promocode', schema: PromocodeSchema },
    ]),
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}

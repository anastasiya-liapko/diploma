import { Module } from '@nestjs/common';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GoodSchema } from '../goods/schema/good.schema';
import { CategorySchema } from '../categories/schema/category.schema';
import { ManufacturerSchema } from '../manufacturers/schema/manufacturer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Good', schema: GoodSchema },
      { name: 'Category', schema: CategorySchema },
      { name: 'Manufacturer', schema: ManufacturerSchema },
    ]),
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}

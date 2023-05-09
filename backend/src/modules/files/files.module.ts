import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { GoodSchema } from '../goods/schema/good.schema';
import { CategorySchema } from '../categories/schema/category.schema';
import { ManufacturerSchema } from '../manufacturers/schema/manufacturer.schema';
import { CartSchema } from '../cart/schema/cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Good', schema: GoodSchema },
      { name: 'Category', schema: CategorySchema },
      { name: 'Manufacturer', schema: ManufacturerSchema },
      { name: 'Cart', schema: CartSchema },
    ]),
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule { }

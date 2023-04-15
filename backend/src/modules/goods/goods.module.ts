import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoodSchema } from './schema/good.schema';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Good', schema: GoodSchema }])],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}

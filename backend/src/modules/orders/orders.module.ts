import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schema/order.schema';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CartSchema } from '../cart/schema/cart.schema';
import { CartService } from '../cart/cart.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, CartService],
})
export class OrdersModule { }

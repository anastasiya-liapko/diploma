import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.interface';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Order') private readonly goodModel: Model<Order>) {}
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EOrderStatus, Order } from './order.interface';
import { User } from '../user/user.interface';
import { PostOrderRequestDto } from './dto/post.resuest.dto';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    private cartService: CartService,
  ) { }

  public get = async (user: User): Promise<any> => {
    const res = await this.orderModel
      .find({ user: user._id })
      .sort({ date: -1 })
      .populate({ path: 'address' })
      .populate({ path: 'user' })
      .populate({ path: 'goods.good' });

    return res;
  };

  public getById = async (user: User, _id: number): Promise<any> => {
    const res = await this.orderModel
      .find({ user: user._id, _id })
      .populate({ path: 'address' })
      .populate({ path: 'user' })
      .populate({ path: 'goods.good' });
    return res[0];
  };

  public post = async (user: User, dto: PostOrderRequestDto): Promise<any> => {
    const cart = await this.cartService.get(user);
    const date = this.getNowDate();
    const lastOrder = await this.orderModel
      .find()
      .limit(1)
      .sort({ $natural: -1 });

    const newOrder = new this.orderModel({
      ...cart,
      ...dto,
      user: user._id,
      status: EOrderStatus.NEW,
      date,
      _id: lastOrder.length ? (lastOrder[0]._id += 1) : 1,
    });
    try {
      const res = await newOrder.save();
      await this.cartService.delete(user);
      return await this.getById(user, res._id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };

  private getNowDate(): Date {
    const newDate = new Date();

    return new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000);
  }
}

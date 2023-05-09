import { BadRequestException, Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EOrderStatus, Order } from './order.interface';
import { User } from '../user/user.interface';
import { PostOrderRequestDto } from './dto/post.resuest.dto';
import { PostOrderResponseDto } from './dto/post.response.dto';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    private cartService: CartService,
  ) { }

  public getById = async (user: User, _id: string): Promise<any> => {
    const res = await this.orderModel
      .find({ _id })
      .populate({ path: 'address' })
      .populate({ path: 'user' })
      .populate({ path: 'goods.good' });
    return res[0];
  };

  // public getAll = async (
  //   user: User,
  //   dto: PostOrderRequestDto,
  // ): Promise<any> => { };

  public post = async (user: User, dto: PostOrderRequestDto): Promise<any> => {
    const cart = await this.cartService.get(user);

    const newOrder = new this.orderModel({
      ...cart,
      ...dto,
      status: EOrderStatus.NEW,
    });
    try {
      const res = await newOrder.save();
      return await this.getById(user, res._id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
}

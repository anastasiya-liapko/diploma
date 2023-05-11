import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EOrderStatus, Order } from './order.interface';
import { User } from '../user/user.interface';
import { PostOrderRequestDto } from './dto/post.resuest.dto';
import { CartService } from '../cart/cart.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    private cartService: CartService,
    private readonly mailerService: MailerService,
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
      const response = await this.getById(user, res._id);
      this.sendMail(response);
      return response;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };

  private getNowDate(): Date {
    const newDate = new Date();

    return new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000);
  }

  private sendMail = async (order: any): Promise<any> => {
    // const message = `
    //   На балансе <strong>${certificate.integration}</strong> партнера <strong>${process.env.PROGRAMM}</strong> не достаточно средств для оформления сертификата.<br>
    //   <br>
    //   Сертификат<br>
    //   ID: ${certificateId}<br>
    //   Name: ${certificate.name}<br>
    //   Nominal: ${certificate.nominal}<br>
    //   <br>
    //   Текущий баланс ${certificate.integration}: ${balance}
    // `;
    const message = 'проверка почты еще раз';

    await this.mailerService.sendMail({
      from: `"СтройДом" <host1858759@aliapko.ru>`,
      to: order.user.email,
      subject: 'Новый заказ',
      html: message,
    });
    Logger.log(
      `NOTIFICATION ORDER SEND TO CLIENT EMAIL: ${JSON.stringify(
        order.user.email,
      )} -- SUCCESS`,
    );
  };
}

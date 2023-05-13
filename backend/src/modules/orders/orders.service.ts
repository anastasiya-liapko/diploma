import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EOrderStatus, Order } from './order.interface';
import { User } from '../user/user.interface';
import { PostOrderRequestDto } from './dto/post.resuest.dto';
import { CartService } from '../cart/cart.service';
import { MailerService } from '@nestjs-modules/mailer';
import { JSDOM } from 'jsdom';
import * as fs from 'fs';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    private cartService: CartService,
    private readonly mailerService: MailerService,
  ) {}

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
    // сохраняем в переменную шаблон письма
    const file = fs.readFileSync('html/email.html', 'utf8');
    // используем jsdom для работы с html (https://www.npmjs.com/package/jsdom)
    const dom = new JSDOM(file);
    // добавляем ссылку на чек в html
    dom.window.document
      .querySelector('#lk_link')
      .setAttribute('href', `https://aliapko.ru/lk`);
    dom.window.document.querySelector('#order_id').innerHTML = ` №${order._id}`;

    await this.mailerService.sendMail({
      from: `"СтройДом" <host1858759@aliapko.ru>`,
      to: order.user.email,
      subject: 'Мы получили ваш заказ',
      html: dom.serialize(),
      attachments: [
        {
          filename: 'logo.png',
          path: 'html/img/logo.png',
          cid: 'logo', //same cid value as in the html img src
        },
      ],
    });
    Logger.log(
      `NOTIFICATION ORDER SEND TO CLIENT EMAIL: ${JSON.stringify(
        order.user.email,
      )} -- SUCCESS`,
    );
  };
}

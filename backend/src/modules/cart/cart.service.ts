import { Injectable, Logger } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './cart.interface';
import { User } from '../user/user.interface';
import { GetCartResponseDto } from './dto/get-cart.response.dto';
import { PatchCartRequestDto } from './dto/patch-cart.request.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel('Cart') private readonly cartModel: Model<Cart>) { }

  public get = async (user: User): Promise<GetCartResponseDto> => {
    try {
      const request = [];

      request.push({ $match: { user: new mongoose.Types.ObjectId(user._id) } });

      request.push({
        $lookup: {
          from: 'goods',
          localField: 'goods.good',
          foreignField: '_id',
          as: 'items',
        },
      });

      // request.push({
      //   $set: {
      //     items: {
      //       $map: {
      //         input: '$items',
      //         in: {
      //           $mergeObjects: [
      //             '$$this',
      //             {
      //               item: {
      //                 $arrayElemAt: [
      //                   '$goods',
      //                   { $indexOfArray: ['$goods.good', '$$this._id'] },
      //                 ],
      //               },
      //             },
      //           ],
      //         },
      //       },
      //     },
      //   },
      // });
      request.push({
        $set: {
          goods: {
            $map: {
              input: '$goods',
              in: {
                $mergeObjects: [
                  '$$this',
                  {
                    good: {
                      $arrayElemAt: [
                        '$items',
                        { $indexOfArray: ['$items._id', '$$this.good'] },
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      });

      const data = await this.cartModel
        .aggregate(request)
        .allowDiskUse(true)
        .exec();

      // if (!data.length) {
      //   const newCart = new this.cartModel({
      //     user: new mongoose.Types.ObjectId(user._id),
      //     goods: [],
      //   });
      //   await newCart.save();

      //   return {
      //     total_price: 0,
      //     goods: [],
      //   };
      // } else {
      //   const goods = data[0].items.map((item) => {
      //     const v = {
      //       count: item.item.count,
      //       good: item,
      //     };
      //     delete v.good.item;
      //     return v;
      //   });

      //   data[0].goods = goods;

      //   const query = { ...data[0] };
      //   query.goods = query.goods.map((item) => {
      //     return {
      //       count: item.count,
      //       good: item.good._id,
      //     };
      //   });
      //   await this.cartModel.findOneAndUpdate(
      //     {
      //       user: new mongoose.Types.ObjectId(user._id),
      //     },
      //     {
      //       $set: query,
      //     },
      //     {
      //       new: true,
      //       lean: true,
      //     },
      //   );
      // }
      if (!data.length) {
        return {
          total_price: 0,
          goods: [],
        };
      }

      const total_price = data[0].goods.reduce((acc: number, item: any, i) => {
        acc += item.count * item.good.price;
        return acc;
      }, 0);

      return {
        total_price,
        goods: data[0].goods,
      };
    } catch (e) {
      Logger.error(`CART GET -- ERROR: ${JSON.stringify(e)}`);
      throw e;
    }
  };

  public patch = async (user: User, dto: PatchCartRequestDto): Promise<any> => {
    const cart = await this.cartModel.find({
      user: new mongoose.Types.ObjectId(user._id),
    });

    if (dto.count === 0) {
      cart[0].goods = cart[0].goods.filter(
        (item: any) => item.good.toString() !== dto._id,
      ) as unknown as any;
    } else {
      const foundIndex = cart[0].goods.findIndex(
        (item: any) => item.good.toString() === dto._id,
      );
      if (foundIndex !== -1) {
        cart[0].goods[foundIndex].count = dto.count;
      } else {
        cart[0].goods.push({
          count: dto.count,
          good: new mongoose.Types.ObjectId(dto._id) as any,
        });
      }
    }

    await this.cartModel.findOneAndUpdate(
      {
        user: new mongoose.Types.ObjectId(user._id),
      },
      { $set: cart[0] },
      {
        new: true,
        lean: true,
      },
    );

    return await this.get(user);
  };

  public delete = async (user: User): Promise<any> => {
    return await this.cartModel.deleteOne({ user: user._id });
  };
}

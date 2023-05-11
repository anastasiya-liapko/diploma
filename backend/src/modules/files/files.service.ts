import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Good } from '../goods/good.interface';
import { Category } from '../categories/category.interface';
import { Manufacturer } from '../manufacturers/manufacturer.interface';
import { UploadResponseDto } from './dto/upload.response.dto';
import { Cart } from '../cart/cart.interface';
import { Order } from '../orders/order.interface';
const XLSX = require('xlsx');
const path = require('path');

@Injectable()
export class FilesService {
  constructor(
    @InjectModel('Good') private readonly goodModel: Model<Good>,
    @InjectModel('Cart') private readonly cartModel: Model<Cart>,
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    @InjectModel('Category')
    private readonly categoryModel: Model<Category>,
    @InjectModel('Manufacturer')
    private readonly manufacturerModel: Model<Manufacturer>,
  ) { }

  async upload(file: Express.Multer.File): Promise<UploadResponseDto> {
    const json: any[] = this.getJson(file);
    const data: {
      goods: Good[];
      categories: Category[];
      manufacturers: Manufacturer[];
    } = await this.parseFile(json);

    try {
      await this.cartModel.collection.drop();
    } catch (e) {
      Logger.error(
        `CART COLLECTION DROP -- ERROR: ${e.response ? JSON.stringify(e.response) : e
        }`,
      );
    }

    try {
      await this.orderModel.collection.drop();
    } catch (e) {
      Logger.error(
        `ORDER COLLECTION DROP -- ERROR: ${e.response ? JSON.stringify(e.response) : e
        }`,
      );
    }

    try {
      await this.goodModel.collection.drop();
    } catch (e) {
      Logger.error(
        `GOODS COLLECTION DROP -- ERROR: ${e.response ? JSON.stringify(e.response) : e
        }`,
      );
    }
    await this.goodModel.collection.insertMany(data.goods);
    await this.goodModel.collection.createIndex({ title: 1 });

    try {
      await this.categoryModel.collection.drop();
    } catch (e) {
      Logger.error(
        `CATEGORY COLLECTION DROP -- ERROR: ${e.response ? JSON.stringify(e.response) : e
        }`,
      );
    }
    await this.categoryModel.collection.insertMany(data.categories);

    try {
      await this.manufacturerModel.collection.drop();
    } catch (e) {
      Logger.error(
        `MANUFACTURER COLLECTION DROP -- ERROR: ${e.response ? JSON.stringify(e.response) : e
        }`,
      );
    }
    await this.manufacturerModel.collection.insertMany(data.manufacturers);

    return { status: 'ok' };
  }

  private getJson(file: Express.Multer.File): any[] {
    let res = [];

    const wb = XLSX.read(file.buffer, { type: 'buffer' });
    wb.SheetNames.some((sheetName) => {
      const ws = wb.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(ws);
      res = res.concat(data);
    });

    if (!res.length) {
      Logger.log(`XLS NOT FOUND -- LOG`);
      throw new HttpException(
        {
          statusCode: 1,
          message: `Не найдены xls листы `,
        },
        500,
      );
    }

    return res;
  }

  private async parseFile(data: any[]): Promise<{
    goods: Good[];
    categories: Category[];
    manufacturers: Manufacturer[];
  }> {
    const goods = [];
    const categories = [];
    const manufacturers = [];

    for (const item of data) {
      const good = {
        id: item.id,
        title: item.title,
        description: item.description,
        imageLink: item.image_link,
        price: +item.price,
        size: item.size,
        weight: item.weight,
        category: null,
        manufacturer: null,
      };

      const found = goods.find((item) => item.id === good.id);
      if (found || !good.price) continue;

      let category = categories.find(
        (category) => category.title === item.category,
      );
      if (!category) {
        const category_id = new mongoose.Types.ObjectId();
        category = {
          _id: category_id,
          title: item.category,
        };
        categories.push(category);
      }

      let manufacturer = manufacturers.find(
        (manufacturer) => manufacturer.title === item.manufacturer,
      );
      if (!manufacturer) {
        const manufacturer_id = new mongoose.Types.ObjectId();
        manufacturer = {
          _id: manufacturer_id,
          title: item.manufacturer,
          description: '',
          imageLink: '',
          siteLink: '',
        };
        manufacturers.push(manufacturer);
      }

      good.category = category._id;
      good.manufacturer = manufacturer._id;
      goods.push(good);
    }

    return { goods, categories, manufacturers };
  }
}

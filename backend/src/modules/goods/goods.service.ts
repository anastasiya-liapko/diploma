import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Good } from './good.interface';

@Injectable()
export class GoodsService {
  constructor(@InjectModel('Good') private readonly goodModel: Model<Good>) {}
}

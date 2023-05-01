import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.interface';
import { getResponseDto } from './dto/get.response.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  public async get(): Promise<getResponseDto[]> {
    return await this.categoryModel.find();
  }
}

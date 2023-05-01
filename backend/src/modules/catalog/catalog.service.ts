import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Manufacturer } from '../manufacturers/manufacturer.interface';
import { Category } from '../categories/category.interface';
import { Good } from '../goods/good.interface';
import { searchRequestDto } from './dto/search.request.dto';
import { searchOneResponseDto } from './dto/searchOne.response.dto';
import { searchResponseDto } from './dto/search.response.dto';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel('Good') private readonly goodModel: Model<Good>,
    @InjectModel('Category')
    private readonly categoryModel: Model<Category>,
    @InjectModel('Manufacturer')
    private readonly manufacturerModel: Model<Manufacturer>,
  ) {}

  async search(dto: searchRequestDto): Promise<searchResponseDto> {
    const { page, size, sort, search } = dto;

    const request = [];

    request.push({
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    });

    request.push({
      $lookup: {
        from: 'manufacturers',
        localField: 'manufacturer',
        foreignField: '_id',
        as: 'manufacturer',
      },
    });

    request.push({
      $project: {
        _id: 0,
        id: 1,
        title: 1,
        description: 1,
        imageLink: 1,
        price: 1,
        size: 1,
        weight: 1,
        category: 1,
        manufacturer: 1,
      },
    });

    if (search) {
      request.push({
        $match: {
          $or: [
            {
              title: {
                $regex:
                  '.*' + search.replace('*', '\\*').replace('+', '\\+') + '.*',
                $options: 'i',
              },
            },
            {
              category: {
                $regex:
                  '.*' + search.replace('*', '\\*').replace('+', '\\+') + '.*',
                $options: 'i',
              },
            },
            {
              manufacturer: {
                $regex:
                  '.*' + search.replace('*', '\\*').replace('+', '\\+') + '.*',
                $options: 'i',
              },
            },
          ],
        },
      });
    }

    const totalElements = await this.getTotalElements(request);
    const totalPages = this.getTotalPages(totalElements, size);

    if (sort) {
      request.push({ $sort: this.setSortParams(sort) });
    }

    if (page !== undefined && size !== undefined) {
      request.push({ $skip: size * page });
      request.push({ $limit: size });
    }

    const data = await this.goodModel
      .aggregate(request)
      .allowDiskUse(true)
      .exec();

    return {
      page,
      size,
      totalPages,
      totalElements,
      data,
    };
  }

  async searchOne(id: number): Promise<searchOneResponseDto> {
    return await this.goodModel
      .findOne({ id }, null, { lean: true })
      .populate('category manufacturer');
  }

  private setSortParams(sort: string): any {
    if (!sort) return;

    const property = sort.split(',').shift();
    const direction = sort.split(',').pop().toUpperCase() === 'ASC' ? 1 : -1;

    return { [property]: direction, id: 1 };
  }

  private getTotalPages(totalElements: number, size: number): number {
    return size ? Math.ceil(totalElements / size) : 0;
  }

  private async getTotalElements(request: any): Promise<number> {
    request = JSON.parse(JSON.stringify(request));

    request.push({
      $count: 'totalElements',
    });

    const totalElements = await this.goodModel.aggregate(request).exec();

    return totalElements.length ? totalElements[0].totalElements : 0;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Manufacturer } from '../manufacturers/manufacturer.interface';
import { Category } from '../categories/category.interface';
import { Good } from '../goods/good.interface';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel('Good') private readonly goodModel: Model<Good>,
    @InjectModel('Category')
    private readonly categoryModel: Model<Category>,
    @InjectModel('Manufacturer')
    private readonly manufacturerModel: Model<Manufacturer>,
  ) {}

  //   async get(): Promise<getCatalogResponseDto[]> {
  //     const res = await this.cardModel
  //       .aggregate([
  //         {
  //           $lookup: {
  //             from: 'certificates',
  //             localField: 'certificates',
  //             foreignField: '_id',
  //             as: 'certificates',
  //           },
  //         },
  //         {
  //           $unwind: {
  //             path: '$certificates',
  //             preserveNullAndEmptyArrays: true,
  //           },
  //         },
  //         {
  //           $replaceRoot: {
  //             newRoot: {
  //               name: '$name',
  //               category: '$category',
  //               nominal: '$certificates.nominal',
  //               product_code: '$certificates.product_code',
  //               terminal_code: '$certificates.terminal_code',
  //             },
  //           },
  //         },
  //         {
  //           $lookup: {
  //             from: 'points',
  //             localField: 'terminal_code',
  //             foreignField: 'terminal_code',
  //             as: 'point',
  //           },
  //         },
  //         {
  //           $unwind: {
  //             path: '$point',
  //             preserveNullAndEmptyArrays: true,
  //           },
  //         },
  //         {
  //           $group: {
  //             _id: {
  //               name: '$name',
  //               category: '$category',
  //               nominal: '$nominal',
  //               product_code: '$product_code',
  //               retail_point_id: '$retail_point_id',
  //             },
  //             name: { $first: '$name' },
  //             category: { $first: '$category' },
  //             nominal: { $first: '$nominal' },
  //             product_code: { $first: '$product_code' },
  //             retail_point_id: { $first: '$point.retail_point_id' },
  //           },
  //         },
  //         {
  //           $replaceRoot: {
  //             newRoot: {
  //               name: '$name',
  //               category: '$category',
  //               nominal: '$nominal',
  //               product_code: '$product_code',
  //               retail_point_id: '$retail_point_id',
  //             },
  //           },
  //         },
  //       ])
  //       .allowDiskUse(true)
  //       .exec();

  //     return res;
  //   }
}

import {
  BadRequestException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Store } from './store.interface';
import { PostStoreRequestDto } from './dto/post.request.dto';
import { PostStoreResponseDto } from './dto/post.response.dto';
import { AddressesService } from '../addresses/addresses.service';
import { GetStoreResponseDto } from './dto/get.response.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel('Store') private readonly storeModel: Model<Store>,
    private addressesService: AddressesService,
  ) { }

  public get = async (): Promise<any> => {
    const res = await this.storeModel.find().populate({
      path: 'addresses',
    });
    return res[0];
  };

  public post = async (
    dto: PostStoreRequestDto,
  ): Promise<PostStoreResponseDto> => {
    const store = await this.storeModel.find();

    if (store.length) {
      await this.addressesService.deleteMany(store[0].addresses);
      try {
        await this.storeModel.collection.drop();
      } catch (e) {
        Logger.error(
          `STORE COLLECTION DROP -- ERROR: ${e.response ? JSON.stringify(e.response) : e
          }`,
        );
      }
    }

    const addresses = await this.addressesService.putMany(dto.addresses);

    const newStore = new this.storeModel({ name: dto.name, addresses });

    try {
      await newStore.save();
      return { status: 'ok' };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
}

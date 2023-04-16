import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from './address.interface';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel('Address') private readonly addressModel: Model<Address>,
  ) {}
}

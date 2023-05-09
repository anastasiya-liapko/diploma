import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from './address.interface';
import { GetAddressResponseDto } from './dto/get-addresses.response.dto';
import { User } from '../user/user.interface';
import { PutAddressRequestDto } from './dto/put-addresses.request.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel('Address') private readonly addressModel: Model<Address>,
    private userService: UserService,
  ) { }

  public get = async ({ email }: User): Promise<GetAddressResponseDto[]> => {
    const user = await this.userService.getUser(email);

    return this.addressModel.find({ _id: { $in: user.addresses } });
  };

  public put = async (
    user: User,
    dto: PutAddressRequestDto,
  ): Promise<GetAddressResponseDto> => {
    const newAddress = new this.addressModel({ ...dto });
    try {
      await this.userService.pushAddress(user.email, newAddress._id);
      return await newAddress.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };

  public putMany = async (dto: PutAddressRequestDto[]): Promise<any> => {
    const res = await this.addressModel.collection.insertMany(dto);
    return Object.values(res.insertedIds);
  };

  public deleteMany = async (dto: any[]): Promise<any> => {
    return await this.addressModel.collection.deleteMany({ _id: { $in: dto } });
  };
}

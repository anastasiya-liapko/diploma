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
import { User } from './user.interface';
import { RefreshUserRequestDto } from '../auth/dto/refreshUser.request.dto';
const crypto = require('crypto');
import { AuthUserRequestDto } from '../auth/dto/authUser.request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>, // @InjectModel('Club') private readonly clubModel: Model<Club>, // @Inject(forwardRef(() => RemoteService)) // private readonly remoteService: RemoteService,
  ) { }

  public async createUser(dto: AuthUserRequestDto): Promise<User> {
    const hash = UserService.wrapPassword(dto.password);

    const newUser = new this.userModel({ ...dto, password: hash });

    try {
      return await newUser.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  public async getUser(email: string): Promise<User> {
    return this.userModel.findOne({ email }, '-password -refresh -__v');
  }

  public async setRefresh(UserID: string): Promise<User> {
    const token = await UserService.generateRefresh();

    return this.userModel
      .findByIdAndUpdate(UserID, { $set: { refresh: token } }, { new: true })
      .select({ refresh: 1, _id: 0 });
  }

  public async removeRefresh(refreshToken: string): Promise<boolean> {
    const res = this.userModel
      .findOneAndUpdate({ refreshToken }, { $set: { refresh: null } })
      .exec();
    if (res) {
      return true;
    }
  }

  public async checkRefresh(dto: RefreshUserRequestDto): Promise<User> {
    return this.userModel.findOne({
      refresh: dto.refreshToken,
    });
  }

  public async checkUserCreds(email: string, password: string): Promise<User> {
    const hash = UserService.wrapPassword(password);
    return this.userModel.findOne({ email, password: hash }).lean();
  }

  public async pushAddress(email: string, address_id: string): Promise<any> {
    return this.userModel.updateOne(
      { email },
      { $push: { addresses: address_id } },
    );
  }

  private static generateRefresh(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        crypto.randomBytes(48, (err, buffer: Buffer) => {
          resolve(buffer.toString('hex'));
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  private static wrapPassword(pwd): string {
    return crypto.createHmac('SHA256', 'b69F3FeB').update(pwd).digest('base64');
  }
}

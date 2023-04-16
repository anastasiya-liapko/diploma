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
import crypto from 'crypto';
import { AuthUserRequestDto } from '../auth/dto/authUser.request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>, // @InjectModel('Club') private readonly clubModel: Model<Club>, // @Inject(forwardRef(() => RemoteService)) // private readonly remoteService: RemoteService,
  ) {}

  public async createUser(dto: AuthUserRequestDto): Promise<User> {
    const hash = UserService.wrapPassword(dto.password);

    const newUser = new this.userModel({ ...dto, password: hash });

    try {
      return await newUser.save({});
    } catch (err) {
      throw new BadRequestException(err);
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

  public async removeRefresh(email: string): Promise<boolean> {
    const res = this.userModel
      .findOneAndUpdate({ email }, { $set: { refresh: null } })
      .exec();
    if (res) {
      return true;
    }
  }

  public async checkRefresh(dto: RefreshUserRequestDto): Promise<User> {
    return this.userModel.findOne({
      email: dto.email,
      refresh: dto.refreshToken,
    });
  }

  public async checkUserCreds(email: string, password: string): Promise<User> {
    const hash = UserService.wrapPassword(password);
    return this.userModel.findOne({ email, password: hash }).lean();
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

  //   async checkBMSAdmin(userId) {
  //     const user = await this.userModel.findById(userId, 'BMSAdmin', {
  //       lean: true,
  //     });
  //     return user.BMSAdmin;
  //   }

  //   async profile(userId: string): Promise<any> {
  //     const BMSAdmin = await this.checkBMSAdmin(userId);
  //     const clubFields = BMSAdmin
  //       ? '-token -webShopToken'
  //       : '-token -api -webShopToken';

  //     const user = await this.userModel
  //       .findById(userId, '-password -refresh -__v', { lean: true })
  //       .populate('structure.club', clubFields);

  //     let clubs;

  //     if (user.structure.length) {
  //       clubs = user.structure.map((item) => item.club);
  //     } else {
  //       clubs = await this.clubModel.find({}, clubFields);
  //     }

  //     const usersPermission =
  //       !user.modules.length || user.modules.find((el) => el.name === 'Users');
  //     let usersTotal = 0;
  //     if (usersPermission) {
  //       usersTotal = await this.getUsersTotal(
  //         this.getAvailableUsersRequest(user),
  //       );
  //     }

  //     return { user, clubs, usersTotal };
  //   }

  //   async edit(dto: EditUserDto): Promise<User> {
  //     const query = { ...dto };

  //     if (dto.password) {
  //       query.password = UserService.wrapPassword(dto.password);
  //     } else {
  //       delete query.password;
  //     }

  //     return this.userModel
  //       .findByIdAndUpdate(dto._id, query, { new: true })
  //       .populate('structure.club', '-_id')
  //       .select({ password: 0, refresh: 0 });
  //   }

  //   async remove(dto: RemoveUserDto): Promise<any> {
  //     return this.userModel
  //       .findOneAndDelete({ _id: dto._id })
  //       .select({ password: 0, refresh: 0 });
  //   }
}

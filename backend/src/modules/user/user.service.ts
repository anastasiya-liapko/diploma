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
import { User, Structure, Module } from './user.interface';
import { RefreshUserDto } from '../auth/dto/refresh-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { RemoveUserDto } from './dto/remove-user.dto';

import { CreateDemoUserDto } from './dto/create-demo-user.dto';
import { EditLoyaltyUserDto } from './dto/edit-loyalty-user.dto';
import { ErrorDto } from '../../global-dto/error.dto';
// tslint:disable-next-line:no-var-requires
import crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>, // @InjectModel('Club') private readonly clubModel: Model<Club>, // @Inject(forwardRef(() => RemoteService)) // private readonly remoteService: RemoteService,
  ) {}

  //   static getAvailableModules(userModules, availableModules): Module[] {
  //     if (!availableModules.length) {
  //       if (!userModules.length) {
  //         return [];
  //       } else {
  //         return userModules;
  //       }
  //     } else {
  //       if (!userModules.length) {
  //         return availableModules;
  //       } else {
  //         return userModules.reduce((res, module) => {
  //           const found = availableModules.find((el) => el.name === module.name);

  //           if (found) {
  //             const elem = JSON.parse(JSON.stringify(found));
  //             elem.permission =
  //               found.permission === 'WRITE'
  //                 ? module.permission
  //                 : found.permission;
  //             res.push(elem);
  //           }

  //           return res;
  //         }, []);
  //       }
  //     }
  //   }

  //   static getAvailableStructure(userStructure, availableStructure): Structure[] {
  //     if (!availableStructure.length) {
  //       if (!userStructure.length) {
  //         return [];
  //       } else {
  //         return userStructure;
  //       }
  //     } else {
  //       if (!userStructure.length) {
  //         return availableStructure;
  //       } else {
  //         return userStructure.reduce((res, structure) => {
  //           const foundStructure = availableStructure.find(
  //             (el) => structure.club.id === el.club.id,
  //           );

  //           if (foundStructure) {
  //             const data = {
  //               club: structure.club,
  //               retails: [],
  //             };

  //             if (structure.retails.length) {
  //               if (foundStructure.retails.length) {
  //                 structure.retails.forEach((retail) => {
  //                   const foundRetail = foundStructure.retails.find(
  //                     (el) => retail.id === el.id,
  //                   );
  //                   if (foundRetail) {
  //                     data.retails.push({
  //                       id: retail.id,
  //                     });

  //                     if (retail.points.length) {
  //                       if (foundRetail.points.length) {
  //                         data.retails[data.retails.length - 1].points =
  //                           retail.points.filter((el) =>
  //                             foundRetail.points.includes(el),
  //                           );
  //                       } else {
  //                         data.retails[data.retails.length - 1].points =
  //                           retail.points;
  //                       }
  //                     } else {
  //                       data.retails[data.retails.length - 1].points =
  //                         foundRetail.points;
  //                     }
  //                   }
  //                 });
  //               } else {
  //                 data.retails = structure.retails;
  //               }
  //             } else {
  //               data.retails = foundStructure.retails;
  //             }

  //             res.push(data);
  //           }

  //           return res;
  //         }, []);
  //       }
  //     }
  //   }

  //   static wrapPassword(pwd): string {
  //     return crypto.createHmac('SHA256', 'b69F3FeB').update(pwd).digest('base64');
  //   }

  //   static generateRefresh(): Promise<string> {
  //     return new Promise((resolve, reject) => {
  //       try {
  //         crypto.randomBytes(48, (err, buffer: Buffer) => {
  //           resolve(buffer.toString('hex'));
  //         });
  //       } catch (e) {
  //         reject(e);
  //       }
  //     });
  //   }

  //   private async getUsersTotal(query: {}): Promise<number> {
  //     return await this.userModel.countDocuments(query);
  //   }

  //   private async getUser(login): Promise<User> {
  //     return this.userModel
  //       .findOne({ login }, '-password -refresh -__v')
  //       .populate('structure.club', '_id id title');
  //   }

  //   async checkBMSAdmin(userId) {
  //     const user = await this.userModel.findById(userId, 'BMSAdmin', {
  //       lean: true,
  //     });
  //     return user.BMSAdmin;
  //   }

  //   async checkUserCreds(login: string, password: string): Promise<User> {
  //     const hash = UserService.wrapPassword(password);
  //     return this.userModel.findOne({ login, password: hash }).lean();
  //   }

  //   async setRefresh(UserID: string): Promise<User> {
  //     const token = await UserService.generateRefresh();
  //     return this.userModel
  //       .findByIdAndUpdate(UserID, { $set: { refresh: token } }, { new: true })
  //       .select({ refresh: 1, _id: 0 });
  //   }

  //   async checkRefresh(dto: RefreshUserDto): Promise<User> {
  //     return this.userModel.findOne({
  //       login: dto.login,
  //       refresh: dto.refreshToken,
  //     });
  //   }

  //   async removeRefresh(login: string): Promise<boolean> {
  //     const res = this.userModel
  //       .findOneAndUpdate({ login }, { $set: { refresh: null } })
  //       .exec();
  //     if (res) {
  //       return true;
  //     }
  //   }

  //   private getAvailableUsersRequest(user: any): any {
  //     let available = {};
  //     let clubs = [];

  //     if (!user.BMSAdmin) {
  //       available = {
  //         $and: [{ BMSAdmin: { $not: { $eq: true } } }],
  //       };

  //       if (user.structure.length) {
  //         clubs = user.structure.map((el) => {
  //           return el.club['_id'];
  //         });
  //         const q = {
  //           $or: [
  //             { structure: { $size: 0 } },
  //             { structure: { $elemMatch: { club: { $in: clubs } } } },
  //           ],
  //         };
  //         available['$and'].push(q);
  //       }
  //     }

  //     return available;
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

  //   async search(authUserLogin, dto, query): Promise<any> {
  //     const authUser = await this.getUser(authUserLogin);

  //     const available = this.getAvailableUsersRequest(authUser);

  //     let request = {};

  //     if (dto.data) {
  //       const data = dto.data;

  //       if (data.club && data.query) {
  //         request = {
  //           $and: [
  //             {
  //               $or: [
  //                 { login: { $regex: '.*' + data.query + '.*', $options: 'i' } },
  //                 { name: { $regex: '.*' + data.query + '.*', $options: 'i' } },
  //               ],
  //             },
  //             {
  //               $or: [
  //                 { structure: { $size: 0 } },
  //                 { structure: { $elemMatch: { club: data.club } } },
  //               ],
  //             },
  //           ],
  //         };
  //       } else if (data.query) {
  //         request = {
  //           $and: [
  //             {
  //               $or: [
  //                 { login: { $regex: '.*' + data.query + '.*', $options: 'i' } },
  //                 { name: { $regex: '.*' + data.query + '.*', $options: 'i' } },
  //               ],
  //             },
  //           ],
  //         };
  //       } else if (data.club) {
  //         request = {
  //           $and: [
  //             {
  //               $or: [
  //                 { structure: { $size: 0 } },
  //                 { structure: { $elemMatch: { club: data.club } } },
  //               ],
  //             },
  //           ],
  //         };
  //       }

  //       if (!authUser.BMSAdmin) {
  //         request['$and'].push(available);
  //       }
  //     } else {
  //       if (!authUser.BMSAdmin) {
  //         request = available;
  //       }
  //     }

  //     const users = await this.userModel
  //       .find(
  //         request,
  //         { password: 0, refresh: 0 },
  //         { limit: +query.limit, skip: +query.limit * +query.page },
  //       )
  //       .populate('structure.club', '_id id title');

  //     users.forEach((user) => {
  //       user.modules = UserService.getAvailableModules(
  //         user.modules,
  //         authUser.modules,
  //       );
  //       user.structure = UserService.getAvailableStructure(
  //         user.structure,
  //         authUser.structure,
  //       );
  //     });

  //     const count = await this.getUsersTotal(available);

  //     return {
  //       content: users,
  //       total: count,
  //     };
  //   }

  //   async searchOne(authUserLogin, login: string): Promise<any> {
  //     const authUser = await this.getUser(authUserLogin);
  //     const user = await this.getUser(login);
  //     user.modules = UserService.getAvailableModules(
  //       user.modules,
  //       authUser.modules,
  //     );
  //     user.structure = UserService.getAvailableStructure(
  //       user.structure,
  //       authUser.structure,
  //     );

  //     return user;
  //   }

  //   async create(dto: CreateUserDto): Promise<User> {
  //     const hash = UserService.wrapPassword(dto.password);

  //     const newUser = new this.userModel({ ...dto, password: hash });

  //     try {
  //       return await newUser.save({});
  //     } catch (err) {
  //       throw new BadRequestException(err);
  //     }
  //   }

  //   async createDemo(dto: CreateDemoUserDto): Promise<User> {
  //     const club = await this.clubModel.findOne({ id: 37 });
  //     const demoUser: any = {
  //       modules: [
  //         { name: 'ClubTransactions', permission: 'READ' },
  //         { name: 'ClubParticipants', permission: 'READ' },
  //         { name: 'ClubReports', permission: 'READ' },
  //         { name: 'ClubPromotions', permission: 'READ' },
  //         { name: 'ClubDashboard', permission: 'READ' },
  //         { name: 'ClubNews', permission: 'READ' },
  //         { name: 'ClubStructure', permission: 'READ' },
  //       ],
  //       structure: [
  //         {
  //           club: {
  //             _id: club._id,
  //           },
  //         },
  //       ],
  //       BMSAdmin: false,
  //       login: dto.login,
  //       password: dto.password,
  //       email: dto.email,
  //       name: dto.name,
  //       demoUser: true,
  //     };
  //     try {
  //       return await this.create(demoUser);
  //     } catch (e) {
  //       throw e;
  //     }
  //   }

  //   async editLoyaltyUser({
  //     _id,
  //     club,
  //     login,
  //     password,
  //   }: EditLoyaltyUserDto): Promise<User | ErrorDto> {
  //     try {
  //       const user = await this.userModel.findById(_id);
  //       const editUser: any = {
  //         _id,
  //         login: login ? login : user.login,
  //         password: password ? password : '',
  //         structure: club
  //           ? [
  //               {
  //                 club: {
  //                   _id: club,
  //                 },
  //               },
  //             ]
  //           : user.structure,
  //         demoUser: false,
  //         modules: [
  //           { name: 'ClubTransactions', permission: 'READ' },
  //           { name: 'ClubParticipants', permission: 'WRITE' },
  //           { name: 'ClubReports', permission: 'READ' },
  //           { name: 'ClubPromotions', permission: 'WRITE' },
  //           { name: 'ClubDashboard', permission: 'READ' },
  //           { name: 'ClubNews', permission: 'WRITE' },
  //           { name: 'ClubStructure', permission: 'WRITE' },
  //           { name: 'Users', permission: 'READ' },
  //         ],
  //       };
  //       return await this.edit(editUser);
  //     } catch (e) {
  //       if (e.code === 11000) {
  //         return {
  //           error: {
  //             code: 1100,
  //             info: {
  //               message: `DuplicateKey - { login: ${login} }`,
  //             },
  //           },
  //         };
  //       }
  //       throw e;
  //     }
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

  //   // for modules.guard
  //   async getModules(UserId: string): Promise<User> {
  //     return this.userModel.findById(UserId, 'modules');
  //   }

  //   // for permission.guard
  //   async getStructure(UserId: string): Promise<User> {
  //     return this.userModel.findById(UserId, 'structure');
  //   }

  //   async getAvailableRetails(UserId: string, club: Club): Promise<any> {
  //     const structure = await this.userModel.findOne(
  //       { _id: UserId, structure: { $elemMatch: { club: club._id.toString() } } },
  //       'structure.$.retails -_id',
  //       { lean: true },
  //     );

  //     let retails;

  //     if (!structure || (structure && !structure.structure[0].retails.length)) {
  //       retails = await this.remoteService.getRetails(club);
  //     } else {
  //       retails = await this.remoteService.searchRetails(club, {
  //         ids: structure.structure[0].retails.map((el) => {
  //           return el.id;
  //         }),
  //       });
  //     }

  //     return retails;
  //   }

  //   async getAvailablePoints(UserId: string, club: Club): Promise<any> {
  //     const user = await this.userModel.findOne(
  //       { _id: UserId, structure: { $elemMatch: { club: club._id } } },
  //       'structure.$.points -_id',
  //       { lean: true },
  //     );

  //     if (!user || (user && !user.structure[0].retails.length)) {
  //       const points = await this.remoteService.getPoints(club);
  //       return points;
  //     } else {
  //       const userRetails = [];
  //       let userPoints = [];
  //       user.structure[0].retails.forEach((el) => {
  //         if (el.points.length) {
  //           userPoints = userPoints.concat(el.points);
  //         } else {
  //           userRetails.push(el.id);
  //         }
  //       });

  //       const points = { content: [] };

  //       if (userRetails.length) {
  //         const pointsByNetworkIds = await this.remoteService.searchPoints(club, {
  //           networkIds: userRetails,
  //         });

  //         points.content = points.content.concat(pointsByNetworkIds.content);
  //       }

  //       if (userPoints.length) {
  //         const pointsByIds = await this.remoteService.searchPoints(club, {
  //           ids: userPoints,
  //         });

  //         points.content = points.content.concat(pointsByIds.content);
  //       }

  //       return points;
  //     }
  //   }

  //   async getAvailableJuridicals(UserId: string, club: Club): Promise<any> {
  //     // Проверять на доступность юр лица здесь, пока просто отправляем список юр лиц
  //     return await this.remoteService.getJuridicals(club);
  //   }
}

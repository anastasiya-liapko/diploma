import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressSchema } from './schema/address.schema';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { UserService } from '../user/user.service';
import { UserSchema } from '../user/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Address', schema: AddressSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AddressesController],
  providers: [AddressesService, UserService],
})
export class AddressesModule { }

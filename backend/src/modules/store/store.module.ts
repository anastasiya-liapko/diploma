import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreSchema } from './schema/store.schema';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { AddressSchema } from '../addresses/schema/address.schema';
import { AddressesService } from '../addresses/addresses.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Store', schema: StoreSchema }]),
    MongooseModule.forFeature([{ name: 'Address', schema: AddressSchema }]),
    UserModule,
  ],
  providers: [StoreService, AddressesService],
  controllers: [StoreController],
})
export class StoreModule { }

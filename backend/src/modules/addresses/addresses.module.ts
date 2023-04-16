import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressSchema } from './schema/address.schema';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Address', schema: AddressSchema }]),
  ],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}

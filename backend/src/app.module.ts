import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { FilesModule } from './modules/files/files.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './modules/auth/constants';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtStrategy } from './modules/auth/jwt.strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import { WsStrategy } from './modules/auth/ws.strategy';
import { ConfigModule } from '@nestjs/config';
import { GoodsModule } from './modules/goods/goods.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ManufacturersModule } from './modules/manufacturers/manufacturers.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { StoreModule } from './modules/store/store.module';

@Module({
  imports: [
    StoreModule,
    UserModule,
    AuthModule,
    FilesModule,
    GoodsModule,
    CatalogModule,
    CategoriesModule,
    ManufacturersModule,
    AddressesModule,
    CartModule,
    OrdersModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/online-store', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '11h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../frontend/dist'),
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'mail.hostland.ru',
          port: 25,
          auth: {
            user: 'host1858759@aliapko.ru',
            pass: 'BwbGWfAmnv',
          },
        },
        defaults: {
          from: 'host1858759@aliapko.ru',
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, WsStrategy],
})
export class AppModule {}

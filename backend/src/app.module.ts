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

@Module({
  imports: [
    // UserModule,
    // AuthModule,
    FilesModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/online-store', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../frontend/dist'),
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.yandex.ru',
          port: 465,
          auth: {
            user: 'reports@bms.group',
            pass: 'hqKip1whqvwZ',
          },
        },
        defaults: {
          from: 'reports@bms.group',
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, WsStrategy],
})
export class AppModule {}

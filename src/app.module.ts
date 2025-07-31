import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaModule } from './common/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModules } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { ProductModule } from './modules/product/product.module';
import { ProgramModule } from './modules/program/program.module';
import { ServicesModule } from './modules/services/services.module';
import { TaskModule } from './modules/task/task.module';
import { OrderModule } from './modules/order/order.module';
import { AddressModule } from './modules/address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PrismaModule,
    AuthModules,
    ProductModule,
    ProgramModule,
    ServicesModule,
    PassportModule,
    TaskModule,
    UserModule,
    OrderModule,
    AddressModule

  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }

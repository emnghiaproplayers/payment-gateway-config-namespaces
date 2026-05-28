import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentGatewayModule } from './payment-gateway/payment-gateway.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import paymentConfig from './config/payment.config';
import { validationSchema } from './config/validation.schema';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    PaymentGatewayModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env.development'],
      load: [appConfig, databaseConfig, paymentConfig],
      validationSchema,
      validationOptions: { abortEarly: true, allowUnknown: false },
    }),
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

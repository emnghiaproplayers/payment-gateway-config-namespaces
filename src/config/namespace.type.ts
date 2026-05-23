import { ConfigType } from '@nestjs/config';
import appConfig from './app.config';
import databaseConfig from './database.config';
import paymentConfig from './payment.config';

export type AppConfig = ConfigType<typeof appConfig>;
export type DatabaseConfig = ConfigType<typeof databaseConfig>;
export type PaymentConfig = ConfigType<typeof paymentConfig>;

export interface AllConfig {
  app: AppConfig;
  database: DatabaseConfig;
  payment: PaymentConfig;
}

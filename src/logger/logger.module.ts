import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as os from 'os';
import { AllConfig } from '../config/namespace.type';

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfig>) => {
        const nodeEnv = configService.get('app.nodeEnv', { infer: true });
        const level = nodeEnv === 'production' ? 'info' : 'debug';

        return {
          level,
          defaultMeta: {
            service: 'payment-gateway',
            hostname: os.hostname(),
          },
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.json(),
          ),
          transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'logs/app.log' }),
            new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
          ],
        };
      },
    }),
  ],
  exports: [WinstonModule],
})
export class LoggerModule {}

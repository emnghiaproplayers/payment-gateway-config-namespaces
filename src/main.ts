import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AllConfig } from './config/namespace.type';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  
  const configService = app.get<ConfigService<AllConfig>>(ConfigService);
  const appName = configService.get('app.name', { infer: true }) ?? 'App';
  const appVersion = configService.get('app.version', { infer: true }) ?? '0.0.1';
  const nodeEnv = configService.get('app.nodeEnv', { infer: true }) ?? 'development';
  const port = configService.get('app.port', { infer: true }) ?? 3000;

  const logger = new Logger('Bootstrap');
  logger.log(`Starting ${appName} v${appVersion} in ${nodeEnv} mode...`);

  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();

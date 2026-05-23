import { Controller, Get, Post, Body } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfig } from '../config/namespace.type';
import { PaymentGatewayService } from './payment-gateway.service';

@Controller('payments')
export class PaymentGatewayController {
  constructor(
    private readonly configService: ConfigService<AllConfig>,
    private readonly paymentService: PaymentGatewayService,
  ) {}

  @Get('config')
  getConfig() {
    // payment.apiKey is type: string | undefined in TS (when infer: true is used)
    const apiKey = this.configService.get('payment.apiKey', { infer: true });
    const appVersion = this.configService.get('app.version', { infer: true }) as string | undefined;

    return {
      appName: this.configService.get('app.name', { infer: true }),
      appPort: this.configService.get('app.port', { infer: true }),
      nodeEnv: this.configService.get('app.nodeEnv', { infer: true }),
      dbHost: this.configService.get('database.host', { infer: true }),
      dbPort: this.configService.get('database.port', { infer: true }),
      dbName: this.configService.get('database.name', { infer: true }),
      paymentProvider: this.configService.get('payment.provider', { infer: true }),
      paymentApiKey: apiKey ? apiKey.substring(0, 6) + '...' : undefined,
      paymentTimeout: this.configService.get('payment.timeoutMs', { infer: true }),
      appVersion,
    };
  }

  @Post('charge')
  charge(@Body() body: { orderId: string; amount: number }) {
    return this.paymentService.charge(body.orderId, body.amount);
  }
}

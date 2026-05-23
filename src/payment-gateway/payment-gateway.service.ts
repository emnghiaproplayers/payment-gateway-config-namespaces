import { Inject, Injectable } from '@nestjs/common';
import type { LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { AllConfig } from '../config/namespace.type';

@Injectable()
export class PaymentGatewayService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly configService: ConfigService<AllConfig>,
  ) {}

  charge(orderId: string, amount: number) {
    const provider = this.configService.get('payment.provider', { infer: true });

    this.logger.log(
      { message: 'charging', orderId, amount },
      PaymentGatewayService.name,
    );
    this.logger.debug?.(
      { message: 'charging details (debug)', orderId, amount },
      PaymentGatewayService.name,
    );

    return {
      orderId: orderId || 'default-id',
      amount: amount || 0,
      provider,
      chargedAt: new Date().toISOString(),
    };
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { PaymentGatewayService } from './payment-gateway.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ConfigService } from '@nestjs/config';

describe('PaymentGatewayService', () => {
  let service: PaymentGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentGatewayService,
        {
          provide: WINSTON_MODULE_NEST_PROVIDER,
          useValue: {
            log: jest.fn(),
            debug: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('stripe'),
          },
        },
      ],
    }).compile();

    service = module.get<PaymentGatewayService>(PaymentGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

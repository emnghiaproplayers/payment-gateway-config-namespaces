import { Test, TestingModule } from '@nestjs/testing';
import { PaymentGatewayController } from './payment-gateway.controller';
import { ConfigService } from '@nestjs/config';
import { PaymentGatewayService } from './payment-gateway.service';

describe('PaymentGatewayController', () => {
  let controller: PaymentGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentGatewayController],
      providers: [
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: PaymentGatewayService,
          useValue: {
            charge: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentGatewayController>(PaymentGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

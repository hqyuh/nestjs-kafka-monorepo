import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/app.dto';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './events/order-created';

@Injectable()
export class AppService {
  constructor(
    @Inject('BILLING_SERVICE') private readonly billingProxyClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createOrder(payload: CreateOrderDto) {
    this.billingProxyClient.emit(
      'order_created',
      new OrderCreatedEvent(payload.name, payload.age, payload.gender),
    );
  }
}

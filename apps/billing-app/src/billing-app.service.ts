import { Inject, Injectable } from '@nestjs/common';
import { OrderCreatedEvent } from './dto/order-created';
import { ClientKafka } from '@nestjs/microservices';
import { UserCreatedEvent } from 'apps/billing-app/src/dto/create-user.dto';

export interface UserData {
  userId: string;
  price: number;
}

@Injectable()
export class BillingAppService {
  constructor(
    @Inject(`AUTH_SERVICE`) private readonly authClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  handleOrderCreated(data: OrderCreatedEvent) {
    const { userId, price } = data;
    this.authClient
      .send(`create_user`, new UserCreatedEvent(userId, price))
      .subscribe((user: UserData) => {
        console.log('Call Billing => ', user);
      });
  }
}

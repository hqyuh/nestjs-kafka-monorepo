import { Inject, Injectable } from '@nestjs/common';
import { OrderCreatedEvent } from './dto/order-created';
import { ClientKafka } from '@nestjs/microservices';
import { UserCreateEvent } from 'apps/billing-app/src/dto/create-user.dto';
import { IStudent } from '@app/database/dto/user.interface';

@Injectable()
export class BillingAppService {
  constructor(
    @Inject(`AUTH_SERVICE`) private readonly authClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  handleOrderCreated(data: OrderCreatedEvent) {
    const { name, age, gender } = data;
    this.authClient
      .send(`create_user`, new UserCreateEvent(name, age, gender))
      .subscribe((user: IStudent) => {
        console.log('Create user successfully => ', user.name, user.age);
      });
  }
}

import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { BillingAppService } from './billing-app.service';
import { ClientKafka, EventPattern } from '@nestjs/microservices';

export interface UserData {
  name: string;
  age: number;
  gender: string;
}

@Controller()
export class BillingAppController implements OnModuleInit {
  constructor(
    private readonly billingAppService: BillingAppService,
    @Inject(`AUTH_SERVICE`) private readonly authClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.authClient.subscribeToResponseOf('create_user');
  }

  @Get()
  getHello(): string {
    return this.billingAppService.getHello();
  }

  @EventPattern('order_created')
  handleOrderCreated(data: UserData) {
    console.log('11 => ', data);
    this.billingAppService.handleOrderCreated(data);
  }
}

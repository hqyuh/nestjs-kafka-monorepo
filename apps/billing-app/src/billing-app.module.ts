import { Module } from '@nestjs/common';
import { BillingAppController } from './billing-app.controller';
import { BillingAppService } from './billing-app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: `AUTH_SERVICE`,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: `auth`,
            brokers: [`localhost:9094`],
          },
          consumer: {
            groupId: `auth-consumer`,
          },
        },
      },
    ]),
  ],
  controllers: [BillingAppController],
  providers: [BillingAppService],
})
export class BillingAppModule {}

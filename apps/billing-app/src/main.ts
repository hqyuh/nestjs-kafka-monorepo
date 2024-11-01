import { NestFactory } from '@nestjs/core';
import { BillingAppModule } from './billing-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      BillingAppModule,
      {
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [`localhost:29092`],
          },
          consumer: {
            groupId: `billing-consumer`,
          },
        },
      },
    );
    app.listen();
  }
  bootstrap();
}
bootstrap();

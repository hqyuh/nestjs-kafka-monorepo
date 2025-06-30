import { NestFactory } from '@nestjs/core';
import { AuthAppModule } from './auth-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthAppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [`localhost:9094`],
        },
        consumer: {
          groupId: `auth-consumer`,
        },
      },
    },
  );
  app.listen();
}
bootstrap();

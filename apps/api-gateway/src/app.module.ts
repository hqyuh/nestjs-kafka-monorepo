import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaModule } from '@app/kafka';
import { AppConfigModule } from '@app/config';
import { TestConsumer } from './test.consumer';
import { DatabaseModule } from '@app/database';
@Module({
  imports: [
    KafkaModule,
    AppConfigModule,
    DatabaseModule,
    ClientsModule.register([
      {
        name: 'BILLING_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'billing',
            brokers: ['localhost:9094', 'localhost:9095', 'localhost:9096'],
          },
          consumer: {
            groupId: 'billing-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, TestConsumer],
})
export class AppModule {}

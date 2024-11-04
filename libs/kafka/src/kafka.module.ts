import { Module } from '@nestjs/common';
import { AppConfigModule } from '@app/config';
import { KafkaConsumerService } from './consumer/kafka.consumer.service';
import { KafkaProducerService } from './producer/kafka.producer.service';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [AppConfigModule, DatabaseModule],
  providers: [KafkaConsumerService, KafkaProducerService],
  exports: [KafkaConsumerService, KafkaProducerService],
})
export class KafkaModule {}

import { Module } from '@nestjs/common';
import { AppConfigModule } from '@app/config';
import { KafkaConsumerService } from './kafka.consumer.service';
import { KafkaProducerService } from './kafka.producer.service';

@Module({
  imports: [AppConfigModule],
  providers: [KafkaConsumerService, KafkaProducerService],
  exports: [KafkaConsumerService, KafkaProducerService],
})
export class KafkaModule {}

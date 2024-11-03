import { AppConfigService } from '@app/config';
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConsumerConfig, ConsumerSubscribeTopics, KafkaMessage } from 'kafkajs';
import { KafkaConsumer } from './consumer.service';
import { DatabaseService } from '@app/database';

interface KafkajsConsumerOptions {
  topics: ConsumerSubscribeTopics;
  config: ConsumerConfig;
  onMessage: (message: KafkaMessage) => Promise<void>;
}

export interface IConsumer {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  consume: (message: any) => Promise<void>;
}

@Injectable()
export class KafkaConsumerService implements OnApplicationShutdown {
  private readonly consumers: IConsumer[] = [];

  constructor(
    private readonly configService: AppConfigService,
    private readonly databaseService: DatabaseService,
  ) {}

  async consume({ topics, config, onMessage }: KafkajsConsumerOptions) {
    const consumer = new KafkaConsumer(
      topics,
      this.databaseService,
      config,
      this.configService.kafka.broker,
    );
    await consumer.connect();
    await consumer.consume(onMessage);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}

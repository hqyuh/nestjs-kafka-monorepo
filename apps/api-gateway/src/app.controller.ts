import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateOrderDto } from './dto/app.dto';
import { KafkaProducerService } from '@app/kafka/kafka.producer.service';

@Controller()
export class AppController {
  constructor(
    private readonly producerService: KafkaProducerService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('')
  createOrder(@Body() payload: CreateOrderDto) {
    return this.appService.createOrder(payload);
  }

  @Post('/kafka')
  kafkaTest() {
    return this.producerService.produce({ value: 'My name is Huy' });
  }
}

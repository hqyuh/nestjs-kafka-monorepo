import { Controller, Get } from '@nestjs/common';
import { AuthAppService } from './auth-app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthAppController {
  constructor(private readonly authAppService: AuthAppService) {}

  @Get()
  getHello(): string {
    return this.authAppService.getHello();
  }

  @MessagePattern(`create_user`)
  getUser(data: any) {
    console.log('Get user event received => ', data);
    return { userId: data.userId, price: data.price };
  }
}

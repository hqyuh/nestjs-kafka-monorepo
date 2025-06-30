import { Controller, Get } from '@nestjs/common';
import { AuthAppService } from './auth-app.service';
import { MessagePattern } from '@nestjs/microservices';

export interface UserData {
  name: string;
  age: number;
  gender: string;
}

@Controller()
export class AuthAppController {
  constructor(private readonly authAppService: AuthAppService) {}

  @Get()
  getHello(): string {
    return this.authAppService.getHello();
  }

  @MessagePattern(`create_user`)
  async createUser(data: UserData) {
    console.log('auth here');
    const createdUser = await this.authAppService.create(data);
    return createdUser;
  }
}

import { Module } from '@nestjs/common';
import { AuthAppController } from './auth-app.controller';
import { AuthAppService } from './auth-app.service';
import { DatabaseModule } from '@app/database';
import { AppConfigModule } from '@app/config';

@Module({
  imports: [DatabaseModule, AppConfigModule],
  controllers: [AuthAppController],
  providers: [AuthAppService],
})
export class AuthAppModule {}

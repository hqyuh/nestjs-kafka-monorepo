import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';
import { UserSchema } from '@app/database/schemas/user.schema';
import { UserSeeder } from '@app/database/user.seeder';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [DatabaseService, UserSeeder],
  exports: [DatabaseService, MongooseModule],
})
export class DatabaseModule {}

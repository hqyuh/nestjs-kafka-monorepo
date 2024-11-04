import { User, UserDocument } from '@app/database/schemas/user.schema';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserSeeder implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async onModuleInit() {
    const users = [{ name: 'Alice', age: 25, gender: 'female' }];

    await this.userModel.insertMany(users);
  }
}

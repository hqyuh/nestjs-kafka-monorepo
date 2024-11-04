import { AbstractRepository } from '@app/database/base/abstract.repository';
import { IStudent } from '@app/database/dto/user.interface';
import { UserDocument } from '@app/database/schemas/user.schema';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class AuthAppService extends AbstractRepository<UserDocument> {
  protected logger: Logger;
  constructor(
    @InjectModel('User') userModel: Model<UserDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {
    super(userModel);
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getById(userId: string): Promise<IStudent> {
    // return await this.model.findById(userId).exec();
    return await this.findOne({ _id: userId });
  }
}

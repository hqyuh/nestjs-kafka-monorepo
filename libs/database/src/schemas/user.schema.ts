import { AbstractDocument } from '@app/database/base/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'User' })
export class User extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

import { Types } from "mongoose"
import { prop, getModelForClass } from "@typegoose/typegoose";

export class User {
  @prop({ required: true })
  name?: string;

  @prop({ required: true })
  key?: string;

  @prop({ default: 0 })
  invites?: number;

  @prop()
  invitedBy?: Types.ObjectId;

  @prop()
  redeemedKey?: string;

  @prop({ default: false })
  banned?: boolean;

  @prop()
  banReason?: string;
}

export default getModelForClass(User, {
  schemaOptions: {
    collection: "users"
  }
});
import { model, Schema, Document, SchemaTypes } from "mongoose"

export interface IUser extends Document {
  name: string;
  key: string;
  invites: number;
  invitedBy: any;
  redeemedKey: string;
  banned: boolean;
  banReason: string;
};

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  key: {
    required: true,
    type: String
  },
  invites: {
    type: Number,
    default: 0
  },
  invitedBy: SchemaTypes.ObjectId,
  redeemedKey: String,
  banned: Boolean,
  banReason: String
});

export default model<IUser>("users", userSchema);
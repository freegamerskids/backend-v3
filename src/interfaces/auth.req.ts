import { Request } from "express";
import { User } from "../models/user.model";

export default interface authRequest extends Request {
  user?: User
};
import userModel from "../models/user.model";
import { Response, NextFunction } from "express";
import authRequest from "../interfaces/auth.req";

export default async (req: authRequest, res: Response, next: NextFunction) => {
  let user = await userModel.findOne({ key: req.headers.authorization });
  if (user) {
    if (user.banned) {
      return res.status(401).json({ 
        success: false, 
        message: `You are banned for "${user.banReason}"` 
      });
    };
    req.user = user;
    next();
  } else {
    res.status(401).json({ 
      success: false,
      message: "You are not authorized"
    });
  };
};
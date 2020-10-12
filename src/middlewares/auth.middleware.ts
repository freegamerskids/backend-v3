import userModel from "../models/user.model";
import { Request, Response, NextFunction } from "express";

export default async function middleware(req: Request, res: Response, next: NextFunction) {
  let user = await userModel.findOne({ key: req.headers.authorization });
  if (user) {
    if (user.banned) {
      return res.status(401).json({ 
        success: false, 
        message: `You are banned for "${user.banReason}"` 
      });
    };
    (req as any).user = user;
    next();
  } else {
    res.status(401).json({ 
      success: false,
      message: "You are not authorized"
    });
  };
};
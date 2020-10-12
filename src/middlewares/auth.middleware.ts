import userModel from "../models/user.model";
import { Response, NextFunction } from "express";
import authRequest from "../interfaces/auth.req";
import authMiddlewareOptions from "../interfaces/authMiddlewareOptions";

export default (options?: authMiddlewareOptions) => async (req: authRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (options) {
    var { deleteVersionKey, ignoreUnauthorizedError } = options; // this is temp
  };

  let user = await userModel.findOne({ key: authorization });
  if (user) {
    if (user.banned) {
      return res.status(401).json({ 
        success: false, 
        message: `You are banned for "${user.banReason}"` 
      });
    };
    if (deleteVersionKey) delete user["__v"] // for safety (TODO: fix this part)
    req.user = user;
    next();
  } else {
    if (ignoreUnauthorizedError) return next();

    res.status(401).json({ 
      success: false,
      message: "You are not authorized"
    });
  };
};
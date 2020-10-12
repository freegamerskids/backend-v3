import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import authRequest from "../interfaces/auth.req";
import userModel from "../models/user.model";
import generateString from "../utils/generateString";
const router: Router = Router();

router.get("/@me", authMiddleware({ deleteVersionKey: true }), (req: authRequest, res) => {
  const { user } = req;
  res.json(user);
});

router.post("/create", authMiddleware({ ignoreUnauthorizedError: true }), async (req: authRequest, res) => {
  const { user: User } = req;
  const { invite: inviteCode, name }: {name: string, invite: string} = req.body; // i defined the invite to be inviteCode so it will make sense just submit a issue if you don't like that way

  if (!name) return res.status(400).json({ success: false, message: "name is required "});
  if (!inviteCode) {
    if (!User || !User.admin) return res.status(403).json({ // TODO: replace this check with a more cleaner one
      success: false, message: "You are not a admin" 
    });
  } else {
    return res.status(400).json({ success: false, message: "Currently you can not create with a invite code "});
  };

  if (await userModel.findOne({ name })) return res.status(400).json({
    success: false,
    message: "User already exists"
  });

  let user = new userModel(); // i wanna do the typeorm way :( too lazy to switch to it tho
  user.key = generateString(18);
  user.name = name;
  await user.save();
  res.json({ key: user.key });
});

export default router;
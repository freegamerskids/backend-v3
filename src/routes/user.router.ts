import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import authRequest from "../interfaces/auth.req";
const router: Router = Router();

router.get("/@me", authMiddleware, (req: authRequest, res) => {
  res.json(req.user);
});

export default router;
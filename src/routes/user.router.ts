import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
const router: Router = Router();

router.get("/@me", authMiddleware, (req: any, res) => {
  res.json(req.user)
});

export default router;
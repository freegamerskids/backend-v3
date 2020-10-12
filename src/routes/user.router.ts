import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
const router: Router = Router();

router.get("/@me", authMiddleware, (req, res) => {
  res.json((req as any).user);
});

export default router;
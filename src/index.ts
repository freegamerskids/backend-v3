import express, { Request, Response, Application } from "express";
import { join } from "path";
import { config } from "dotenv"; config({ path: join(__dirname, "../.env") });
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "Welcome to the elerium.cc api" });
});

app.listen(process.env.PORT);
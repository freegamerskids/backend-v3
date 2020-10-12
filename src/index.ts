import express from "express";
import { connect } from "mongoose";
import { join } from "path";
import { config } from "dotenv"; config({ path: join(__dirname, "../.env") });
import userRouter from "./routes/user.router";
const app = express();

app.use("/users", userRouter);

connect(process.env.MONGO_URL!, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("successfully connected to mongodb server");
  app.listen(process.env.PORT, () => {
    console.log("successfully started the http server");
  });
});
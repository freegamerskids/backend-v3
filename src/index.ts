import express, { json } from "express";
import { connect } from "mongoose";
import { join } from "path";
import { config } from "dotenv"; config({ path: join(__dirname, "../.env") });
import userRouter from "./routes/user.router";
const { MONGO_URL, PORT } = process.env;
const app = express();
app.use(json());
app.use("/users", userRouter);


connect(MONGO_URL!, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("successfully connected to mongodb server");
  app.listen(PORT, () => {
    console.log("successfully started the http server");
  });
});
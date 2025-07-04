import express from "express";
import getPath from "./utils/getPath";
import dotenv from "dotenv";
dotenv.config({ path: getPath(__dirname, "../.env") });
import env from "./keys/env";
import userRouter from "./routes/user.route";
import fileRouter from "./routes/file.routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const server = express();

server.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);
server.use(express.json());
server.use(cookieParser());
server.use("/user-api", userRouter);
server.use("/file-api", fileRouter);

server.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});

import express from "express";
import getPath from "./utils/getPath";
import dotenv from "dotenv";
dotenv.config({ path: getPath(__dirname, "../.env") });
import env from "./keys/env";
import userRouter from "./routes/user.route";
import fileRouter from "./routes/file.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import { getIP } from "./utils/getIP";

const server = express();

const allowedOrigins = [
  env.CLIENT_URL,
  `${env.CLIENT_URL_IP}:${env.CLIENT_URL_IP_PORT}`,
];
console.log(allowedOrigins);

server.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        // console.log("incoming origin", origin);
        callback(null, true);
      } else {
        // console.log("incoming origin", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
server.use(express.json());
server.use(cookieParser());
server.use("/user-api", userRouter);
server.use("/file-api", fileRouter);

getIP();

// server.listen(env.PORT, () => {
//   console.log(`Server is running on port ${env.PORT}`);
// });
server.listen(Number(env.PORT), "0.0.0.0", () => {
  console.log(`Server is running on ${getIP()}:${env.PORT}`);
});

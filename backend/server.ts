import express from "express";
import getPath from "./utils/getPath";
import dotenv from "dotenv";
dotenv.config({ path: getPath(__dirname, "../.env") });
import env from "./keys/env";

const server = express();

server.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});

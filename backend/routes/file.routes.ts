import { Router } from "express";
import env from "../keys/env";
const fileRouter = Router();
import auth from "../middlewares/authMiddleware";

fileRouter.post("/upload", auth, (req: any, res: any) => {
  res.status(200).json({
    message: "File uploaded successfully",
  });
});
export default fileRouter;
module.exports = fileRouter;

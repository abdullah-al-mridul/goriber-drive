import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../keys/env";
const auth = (req: any, res: any, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized", email: env.EMAIL });
    }
    const decoded = jwt.verify(token, env.JWT_SECRET as string);
    if (typeof decoded !== "object" || decoded === null) {
      return res
        .status(401)
        .json({ message: "Unauthorized", email: env.EMAIL });
    }
    const { email, password } = decoded as { email: string; password: string };
    if (email !== env.EMAIL || password !== env.PASSWORD) {
      return res
        .status(401)
        .json({ message: "Unauthorized", email: env.EMAIL });
    }
    req.user = {
      email: email,
    };

    // console.log(decoded);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", email: env.EMAIL });
  }
};
export default auth;
// module.exports = auth;

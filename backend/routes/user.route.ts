import { Router } from "express";
import env from "../keys/env";
import generateToken from "../utils/jwt";
const userRouter = Router();
import auth from "../middlewares/authMiddleware";
userRouter.post("/login", (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (email !== env.EMAIL || password !== env.PASSWORD) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken({ email, password });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
userRouter.get("/user", auth, (req: any, res: any) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: "User data retrieved successfully",
      user: user || null,
    });
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
export default userRouter;
// module.exports = userRouter;

import jwt, { JwtPayload, SignOptions, Secret } from "jsonwebtoken";
import env from "../keys/env";

interface TokenPayload extends JwtPayload {
  email: string;
  password: string;
}

const generateToken = (
  payload: TokenPayload,
  expiresIn: SignOptions["expiresIn"] = (env.JWT_EXPIRE ||
    "1d") as SignOptions["expiresIn"]
): string => {
  const secret: Secret = env.JWT_SECRET || "default_secret_key";

  const options: SignOptions = {
    expiresIn,
  };

  return jwt.sign(payload, secret, options);
};
export default generateToken;
// module.exports = generateToken;

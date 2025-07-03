interface Env {
  PORT: string | undefined;
  EMAIL: string | undefined;
  PASSWORD: string | undefined;
  JWT_SECRET: string | undefined;
  JWT_EXPIRE: string | undefined;
}

const env: Env = {
  PORT: process.env.PORT || "3000",
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
};
export default env;
module.exports = env;

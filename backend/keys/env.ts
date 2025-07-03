interface Env {
  PORT: string | undefined;
  EMAIL: string | undefined;
  PASSWORD: string | undefined;
  JWT_SECRET: string | undefined;
  JWT_EXPIRE: string | undefined;
  DATA_PATH: string | undefined;
  MAX_FILE_PER_PAGE: number;
}

const env: Env = {
  PORT: process.env.PORT || "3000",
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  DATA_PATH: process.env.DATA_PATH,
  MAX_FILE_PER_PAGE: process.env.MAX_FILE_PER_PAGE
    ? parseInt(process.env.MAX_FILE_PER_PAGE, 10)
    : 20,
};
export default env;
// module.exports = env;

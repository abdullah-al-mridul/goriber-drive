interface Env {
  PORT: string;
}

const env: Env = {
  PORT: process.env.PORT || "3000",
};
export default env;

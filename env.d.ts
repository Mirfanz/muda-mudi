declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    JWT_SECRET: string;
    SALT_ROUNDS: string;
    DEFAULT_PASSWORD: string;
    TRAKTEER_KEY: string;
  }
}

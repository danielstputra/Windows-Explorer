const NODE_ENV = Bun.env.NODE_ENV || "development";

const getEnv = (key: string, fallback?: string): string => {
  const value = Bun.env[key];
  if (!value && fallback === undefined) {
    throw new Error(`❌ Missing required env: ${key}`);
  }
  return value ?? fallback!;
};

const parseArrayEnv = (env?: string): string[] => {
  return env ? env.split(",").map((s) => s.trim()) : [];
};

export const config = {
  env: NODE_ENV,

  db: {
    host: getEnv("DB_HOST", "localhost"),
    user: getEnv("DB_USER", "root"),
    password: getEnv("DB_PASS", ""),
    name: getEnv("DB_NAME", "db_daniels"),
    port: parseInt(getEnv("PORT", "3306"), 10),
  },

  server: {
    port: parseInt(getEnv("PORT", "3000"), 10),
  },

  api: {
    version: getEnv("API_VERSION", "v1"),
    key: getEnv("API_KEY", "DanielsDeveloper"),
    origins: parseArrayEnv(getEnv("CORS_ORIGIN", "*")),
  },

  developer: {
    name: getEnv("DEVELOPER_NAME", "Daniels Trysyahputra"),
  },
};

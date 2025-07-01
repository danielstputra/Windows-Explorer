// const NODE_ENV = Bun.env.NODE_ENV || "development";

// const getEnv = (key: string, fallback?: string): string => {
//   const value = Bun.env[key];
//   if (!value && fallback === undefined) {
//     throw new Error(`❌ Missing required env: ${key}`);
//   }
//   return value ?? fallback!;
// };

const parseArrayEnv = (env?: string): string[] => {
  return env ? env.split(",").map((s) => s.trim()) : [];
};

export const config = {
  api: {
    version: import.meta.env.VITE_API_VERSION || "v1",
    url: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    key: import.meta.env.VITE_API_KEY || "DanielsDeveloper",
    origins: parseArrayEnv(import.meta.env.VITE_CORS_ORIGIN),
  },
};

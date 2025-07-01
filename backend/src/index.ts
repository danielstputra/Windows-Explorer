import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import { folderRoutes } from "./routes/v1/folder.route";
import { fileRoutes } from "./routes/v1/file.route";
import { initializeDatabase } from "./db/init-db";
import { apiKeyGuard } from "./middlewares/api.middleware";
import { config } from "./config";

await initializeDatabase(false);

const allowedOrigins = config.api.origins || ["*"];

const app = new Elysia();

app
  // .use(
  //   cors({
  //     origin: (request) => {
  //       const origin = request.headers.get("origin");
  //       if (!origin) return false;

  //       const allowed = allowedOrigins.includes(origin);
  //       if (!allowed) {
  //         console.warn(`❌ Blocked CORS origin: ${origin}`);
  //       }

  //       return allowed;
  //     },
  //     credentials: true,
  //     allowedHeaders: ["Content-Type", "x-api-key"],
  //     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  //   })
  // )
  .use(
    cors({
      origin: "*",
      credentials: true,
      allowedHeaders: ["Content-Type", "x-api-key"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
  )
  // .use(apiKeyGuard)
  .use(folderRoutes)
  .use(fileRoutes)

  .options("*", () => new Response(null, { status: 204 }))

  .onRequest(({ request }) => {
    console.log("📥 Request:", request.method, request.url);
  })

  .get("/", () => {
    return {
      success: true,
      message: `Hello, my name is ${config.developer.name}. Welcome to the APIKu!`,
    };
  })

  .onStart(() => {
    console.log(`🚀 APIKu running at http://localhost:${config.server.port}`);
    console.table(
      app.routes.map((r) => ({
        method: r.method,
        path: r.path,
      }))
    );

    console.log("✅ Allowed CORS origins:", allowedOrigins);
  })

  .onError(({ code, error, request }) => {
    const url = request?.url || "unknown";
    console.error(`❌ [${code}] ${url}`, error);

    let status = 500;
    let message = "Internal Server Error";

    switch (code) {
      case "NOT_FOUND":
        status = 404;
        message = "Route not found";
        break;
      case "VALIDATION":
        status = 400;
        message = error.message || "Validation failed";
        break;
      case "INTERNAL_SERVER_ERROR":
      case "UNKNOWN":
        message = error.message || message;
        break;
    }

    return new Response(
      JSON.stringify({
        success: false,
        code,
        message,
      }),
      {
        status,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  })

  .listen({
    port: config.server.port,
    hostname: "0.0.0.0",
  });

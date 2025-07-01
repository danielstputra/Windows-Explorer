import { Elysia } from "elysia";
import { config } from "../config";
import { ok, fail, unauthorized } from "../utils/response";

export const apiKeyGuard = new Elysia().onRequest(({ request }) => {
  const key =
    request.headers.get("x-api-key") ||
    new URL(request.url).searchParams.get("api_key");

  if (key !== config.api.key) {
    return new Response(
      JSON.stringify(unauthorized("Unauthorized. Invalid API Key.")),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});

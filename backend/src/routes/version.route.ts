import { Elysia } from "elysia";
import { folderRoutes } from "./v1/folder.route";
import { ok, fail } from "../utils/response";

export const versionRoutes = new Elysia().get("/api/folders", ({ request }) => {
  const version =
    new URL(request.url).searchParams.get("version") ||
    request.headers.get("x-api-version") ||
    request.headers.get("accept")?.match(/vnd\.api\.v(\d+)/)?.[1] ||
    "1";

  switch (version) {
    case "1":
      return folderRoutes.handle(request);
    default:
      return fail(`Unsupported API version: v${version}`);
  }
});

import { Elysia, t } from "elysia";
import { FileController } from "../../controllers/file.controller";
import { config } from "../../config";

const API_VERSION = config.api.version || "v1";

export const fileRoutes = new Elysia({ prefix: `/api/${API_VERSION}/files` })
  .get("/", async () => await FileController.getAll(API_VERSION))
  .get(
    "/folder/:folderId",
    async ({ params }) =>
      await FileController.getByFolder(Number(params.folderId), API_VERSION)
  )
  .post(
    "/",
    async ({ body }) =>
      await FileController.create(
        {
          folder_id: body.folder_id,
          name: body.name,
          size: body.size,
          mime_type: body.mime_type || "application/octet-stream",
        },
        API_VERSION
      ),
    {
      body: t.Object({
        folder_id: t.Number(),
        name: t.String(),
        size: t.Number(),
        mime_type: t.Optional(t.String()),
      }),
    }
  )
  .put(
    "/:id",
    async ({ params, body }) =>
      await FileController.update(
        Number(params.id),
        {
          folder_id: body.folder_id,
          name: body.name,
          size: body.size,
          mime_type: body.mime_type || "application/octet-stream",
        },
        API_VERSION
      ),
    {
      body: t.Object({
        folder_id: t.Optional(t.Number()),
        name: t.Optional(t.String()),
        size: t.Optional(t.Number()),
        mime_type: t.Optional(t.String()),
      }),
    }
  )
  .delete(
    "/:id",
    async ({ params }) =>
      await FileController.delete(Number(params.id), API_VERSION)
  );

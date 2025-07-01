import { Elysia, t } from "elysia";
import { FolderController } from "../../controllers/folder.controller";
import { config } from "../../config";

const API_VERSION = config.api.version || "v1";

export const folderRoutes = new Elysia({
  prefix: `/api/${API_VERSION}/folders`,
})
  .get("/", async () => await FolderController.getAll(API_VERSION))
  .get(
    "/:id/subfolders",
    async ({ params }) =>
      await FolderController.getSubfolders(Number(params.id), API_VERSION)
  )
  .post(
    "/",
    async ({ body }) =>
      await FolderController.create(
        {
          name: body.name,
          parent_id: body.parent_id ?? null,
        },
        API_VERSION
      ),
    {
      body: t.Object({
        name: t.String(),
        parent_id: t.Optional(t.Nullable(t.Number())),
      }),
    }
  )
  .put(
    "/:id",
    async ({ params, body }) =>
      await FolderController.update(
        Number(params.id),
        {
          name: body.name,
          parent_id: body.parent_id ?? null,
        },
        API_VERSION
      ),
    {
      body: t.Object({
        name: t.Optional(t.String()),
        parent_id: t.Optional(t.Nullable(t.Number())),
      }),
    }
  )
  .delete(
    "/:id",
    async ({ params }) => await FolderController.delete(Number(params.id), API_VERSION)
  );

import { FolderService } from "../services/folder.service";
import { ok, fail } from "../utils/response";
import type { Folder } from "../entities/folder.entity";

export const FolderController = {
  getAll: async (version: string) => {
    try {
      if (version !== "v1")
        return fail(
          `Unsupported API version: v${version}`,
          [],
          version,
          "folders"
        );

      const result = await FolderService.getAllFolders(version);
      if (!result || result.length === 0)
        return fail("No folders found", [], version, "folders");

      return ok(result, "Success fetch data.", version, "folders");
    } catch (err) {
      return fail("Failed to fetch folders", [], version, "folders");
    }
  },

  getSubfolders: async (id: number, version: string) => {
    try {
      if (version !== "v1")
        return fail(
          `Unsupported API version: v${version}`,
          [],
          version,
          "folders"
        );

      const result = await FolderService.getSubfolders(id, version);
      if (!result || result.length === 0)
        return fail("No Sub folders found", [], version, "folders");

      return ok(result, "Success fetch data.", version, "folders");
    } catch (err) {
      return fail("Failed to fetch subfolders", [], version, "folders");
    }
  },

  create: async (
    data: Omit<Folder, "id" | "created_at" | "updated_at">,
    version: string
  ) => {
    try {
      if (version !== "v1")
        return fail(`Unsupported API version: v${version}`, null, version);

      const id = await FolderService.insert(data, version);
      return ok({ id }, "Folder created successfully", version);
    } catch (err) {
      return fail("Failed to create folder", null, version);
    }
  },

  update: async (
    id: number,
    data: Partial<Omit<Folder, "id" | "created_at" | "updated_at">>,
    version: string
  ) => {
    try {
      if (version !== "v1")
        return fail(`Unsupported API version: v${version}`, null, version);

      const updated = await FolderService.update(id, data, version);
      return updated
        ? ok(null, "Folder updated", version)
        : fail("Folder not found", null, version);
    } catch (err) {
      return fail("Failed to update folder", null, version);
    }
  },

  delete: async (id: number, version: string) => {
    try {
      if (version !== "v1")
        return fail(`Unsupported API version: v${version}`, null, version);

      const deleted = await FolderService.delete(id, version);
      return deleted
        ? ok(null, "Folder deleted", version)
        : fail("Folder not found", null, version);
    } catch (err) {
      return fail("Failed to delete folder", null, version);
    }
  },
};

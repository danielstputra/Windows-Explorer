import { FileService } from "../services/file.service";
import { ok, fail } from "../utils/response";
import type { File } from "../entities/file.entity";

export const FileController = {
  getAll: async (version: string) => {
    try {
      if (version !== "v1")
        return fail(
          `Unsupported API version: v${version}`,
          [],
          version,
          "files"
        );

      const result = await FileService.getAll(version);
      if (!result || result.length === 0)
        return fail("No files found", [], version, "files");

      return ok(result, "Success fetch files", version, "files");
    } catch (err) {
      return fail("Failed to fetch files", [], version, "files");
    }
  },

  getByFolder: async (folderId: number, version: string) => {
    try {
      if (version !== "v1")
        return fail(
          `Unsupported API version: v${version}`,
          [],
          version,
          "files"
        );

      const result = await FileService.getFilesByFolder(folderId, version);
      if (!result || result.length === 0)
        return fail("No files found in this folder", [], version, "files");

      return ok(result, "Success fetch files", version, "files");
    } catch (err) {
      return fail("Failed to fetch files by folder", [], version, "files");
    }
  },

  create: async (
    data: Omit<File, "id" | "created_at" | "updated_at">,
    version: string
  ) => {
    try {
      if (version !== "v1")
        return fail(`Unsupported API version: v${version}`, null, version);

      const id = await FileService.insert(data, version);
      return ok({ id }, "File created successfully", version);
    } catch (err) {
      return fail("Failed to create file", null, version);
    }
  },

  update: async (
    id: number,
    data: Partial<Omit<File, "id" | "created_at" | "updated_at">>,
    version: string
  ) => {
    try {
      if (version !== "v1")
        return fail(`Unsupported API version: v${version}`, null, version);

      const updated = await FileService.update(id, data, version);
      return updated
        ? ok(null, "File updated", version)
        : fail("File not found", null, version);
    } catch (err) {
      return fail("Failed to update file", null, version);
    }
  },

  delete: async (id: number, version: string) => {
    try {
      if (version !== "v1")
        return fail(`Unsupported API version: v${version}`, null, version);

      const deleted = await FileService.delete(id, version);
      return deleted
        ? ok(null, "File deleted", version)
        : fail("File not found", null, version);
    } catch (err) {
      return fail("Failed to delete file", null, version);
    }
  },
};

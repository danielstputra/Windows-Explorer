import type { File } from "../entities/file.entity";
import {
  typedQuery,
  fetchAll,
  fetchById,
  insertOne,
  deleteById,
  updateById,
} from "../db/db";

const getFilesByFolderIdV1 = async (folderId: number): Promise<File[]> => {
  return await typedQuery<File>("SELECT * FROM files WHERE folder_id = ?", [
    folderId,
  ]);
};

export const FileRepository = {
  getFilesByFolderId: async (
    folderId: number,
    version: string
  ): Promise<File[]> => {
    switch (version) {
      case "v1":
        return getFilesByFolderIdV1(folderId);
      default:
        throw new Error(`Unsupported version: ${version}`);
    }
  },

  getAll: async (version: string): Promise<File[]> => {
    switch (version) {
      case "v1":
        return fetchAll<File>("files");
      default:
        throw new Error(`Unsupported version: ${version}`);
    }
  },

  getById: async (id: number, version: string): Promise<File | null> => {
    switch (version) {
      case "v1":
        return fetchById<File>("files", id);
      default:
        throw new Error(`Unsupported version: ${version}`);
    }
  },

  insert: async (
    data: Omit<File, "id" | "created_at" | "updated_at">,
    version: string
  ): Promise<number> => {
    switch (version) {
      case "v1":
        return insertOne("files", data);
      default:
        throw new Error(`Unsupported version: ${version}`);
    }
  },

  delete: async (id: number, version: string): Promise<boolean> => {
    switch (version) {
      case "v1":
        return deleteById("files", id);
      default:
        throw new Error(`Unsupported version: ${version}`);
    }
  },

  update: async (
    id: number,
    data: Partial<Omit<File, "id" | "created_at" | "updated_at">>,
    version: string
  ): Promise<boolean> => {
    switch (version) {
      case "v1":
        return updateById("files", id, data);
      default:
        throw new Error(`Unsupported version: ${version}`);
    }
  },
};

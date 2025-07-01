import { FileRepository } from "../repositories/file.repository";
import type { File } from "../entities/file.entity";
import { config } from "../config";

const API_VERSION = config.api.version || "v1";

export const FileService = {
  getFilesByFolder: async (
    folderId: number,
    version: string
  ): Promise<File[]> => {
    return await FileRepository.getFilesByFolderId(folderId, version);
  },

  getAll: async (version: string): Promise<File[]> => {
    return await FileRepository.getAll(version);
  },

  getById: async (id: number, version: string): Promise<File | null> => {
    return await FileRepository.getById(id, version);
  },

  insert: async (
    data: Omit<File, "id" | "created_at" | "updated_at">,
    version: string
  ): Promise<number> => {
    return await FileRepository.insert(data, version);
  },

  update: async (
    id: number,
    data: Partial<Omit<File, "id" | "created_at" | "updated_at">>,
    version: string
  ): Promise<boolean> => {
    return await FileRepository.update(id, data, version);
  },

  delete: async (id: number, version: string): Promise<boolean> => {
    return await FileRepository.delete(id, version);
  },
};

import { FolderRepository } from "../repositories/folder.repository";
import type { Folder } from "../entities/folder.entity";
import type { FolderModel } from "../models/folder.model";

export const FolderService = {
  getAllFolders: async (version: string): Promise<Folder[]> => {
    return await FolderRepository.getAll(version);
  },

  getSubfolders: async (
    parentId: number,
    version: string
  ): Promise<Folder[]> => {
    return await FolderRepository.getSubfolders(parentId, version);
  },

  buildTree: async (version: string): Promise<FolderModel[]> => {
    const flat = await FolderRepository.getAll(version);
    return await FolderRepository.buildTree(flat);
  },

  getById: async (id: number, version: string): Promise<Folder | null> => {
    return await FolderRepository.getById(id, version);
  },

  insert: async (
    data: Omit<Folder, "id" | "created_at" | "updated_at">,
    version: string
  ): Promise<number> => {
    return await FolderRepository.insert(data, version);
  },

  update: async (
    id: number,
    data: Partial<Omit<Folder, "id" | "created_at" | "updated_at">>,
    version: string
  ): Promise<boolean> => {
    return await FolderRepository.update(id, data, version);
  },

  delete: async (id: number, version: string): Promise<boolean> => {
    return await FolderRepository.delete(id, version);
  },
};

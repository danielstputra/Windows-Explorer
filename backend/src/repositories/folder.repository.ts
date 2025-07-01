import type { Folder } from "../entities/folder.entity";
import type { FolderModel } from "../models/folder.model";
import {
  typedQuery,
  fetchAll,
  fetchById,
  insertOne,
  deleteById,
  updateById,
} from "../db/db";

async function getAllV1(): Promise<Folder[]> {
  return fetchAll<Folder>("folders");
}

async function getSubfoldersV1(parentId: number): Promise<Folder[]> {
  return typedQuery<Folder>("SELECT * FROM folders WHERE parent_id = ?", [
    parentId,
  ]);
}

async function buildTree(
  flat: Folder[],
  parentId: number | null = null
): Promise<FolderModel[]> {
  const children = flat.filter((f) => f.parent_id === parentId);

  const result = await Promise.all(
    children.map(async (f) => ({
      ...f,
      children: await buildTree(flat, f.id),
    }))
  );

  return result;
}

export const FolderRepository = {
  getAll: async (version: string): Promise<Folder[]> => {
    switch (version) {
      case "v1":
        return getAllV1();
      default:
        throw new Error(`Unsupported version: ${version}`);
    }
  },

  getSubfolders: async (
    parentId: number,
    version: string
  ): Promise<Folder[]> => {
    switch (version) {
      case "v1":
        return getSubfoldersV1(parentId);
      default:
        throw new Error(`Unsupported version: ${version}`);
    }
  },

  buildTree: async (flat: Folder[]): Promise<FolderModel[]> => {
    return buildTree(flat);
  },

  getById: async (id: number, version: string): Promise<Folder | null> => {
    switch (version) {
      case "v1":
        return fetchById<Folder>("folders", id);
      default:
        throw new Error(`Unsupported version: ${version}`);
    }
  },

  insert: async (
    data: Omit<Folder, "id" | "created_at" | "updated_at">,
    version: string
  ): Promise<number> => {
    switch (version) {
      case "v1":
        return insertOne("folders", data);
      default:
        throw new Error(`Unsupported version: ${version}`);
    }
  },

  update: async (
    id: number,
    data: Partial<Omit<Folder, "id" | "created_at" | "updated_at">>,
    version: string
  ): Promise<boolean> => {
    switch (version) {
      case "v1":
        return updateById("folders", id, data);
      default:
        throw new Error(`Unsupported version: ${version}`);
    }
  },

  delete: async (id: number, version: string): Promise<boolean> => {
    switch (version) {
      case "v1":
        return deleteById("folders", id);
      default:
        throw new Error(`Unsupported version: ${version}`);
    }
  },
};

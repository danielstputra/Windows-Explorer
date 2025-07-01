import { defineStore } from "pinia";
import type { FolderTree } from "@/types/folder";

export const useFolderStore = defineStore("folder", {
  state: () => ({
    selectedFolder: null as FolderTree | null,
    folders: [] as FolderTree[],
    subfolders: [] as FolderTree[],
    breadcrumbs: [] as FolderTree[],
  }),
  actions: {
    breadcrumbBack() {
      this.breadcrumbs.pop();

      const last = this.breadcrumbs[this.breadcrumbs.length - 1] || null;
      this.selectedFolder = last;
    },

    setSelectedFolder(folder: FolderTree) {
      this.selectedFolder = folder;

      const index = this.breadcrumbs.findIndex((f) => f.id === folder.id);
      if (index !== -1) {
        this.breadcrumbs = this.breadcrumbs.slice(0, index + 1);
      } else {
        this.breadcrumbs.push(folder);
      }
    },

    setBreadcrumbs(folders: FolderTree[]) {
      this.breadcrumbs = folders;
    },

    popBreadcrumb() {
      this.breadcrumbs.pop();
      this.selectedFolder =
        this.breadcrumbs[this.breadcrumbs.length - 1] ?? null;
    },

    resetBreadcrumb() {
      this.breadcrumbs = [];
      this.selectedFolder = null;
    },

    setFolders(folders: FolderTree[]) {
      this.folders = folders;
    },

    setSubfolders(subfolders: FolderTree[]) {
      this.subfolders = subfolders;
    },
  },
});

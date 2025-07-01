import { defineStore } from "pinia";
import type { File } from "@/types/file";

export const useFileStore = defineStore("file", {
  state: () => ({
    files: [] as File[],
  }),
  actions: {
    setFiles(files: File[]) {
      this.files = files;
    },
  },
});

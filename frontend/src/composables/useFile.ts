import { useFileStore } from "@/stores/file.store";
import { fetchFilesByFolder } from "@/services/file.service";
import type { File } from "@/types/file";

export async function useFile() {
  const store = useFileStore();

  async function loadFiles(folderId: number) {
    const res = await fetchFilesByFolder(folderId);
    const dynamicKey = Object.keys(res).find(
      (key) => key !== "success" && key !== "message"
    );
    const files = (res[dynamicKey as keyof typeof res] || []) as File[];
    store.setFiles(files);
  }

  return {
    loadFiles,
  };
}

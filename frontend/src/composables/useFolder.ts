import { useFolderStore } from "@/stores/folder.store";
import { fetchAllFolders, fetchSubfolders } from "@/services/folder.service";
import type { FolderTree } from "@/types/folder";

// function buildTree(
//   flat: FolderTree[],
//   parentId: number | null = null
// ): FolderTree[] {
//   return flat
//     .filter((f) => f.parent_id === parentId)
//     .map((f) => ({
//       ...f,
//       children: buildTree(flat, f.id),
//     }));
// }

export async function useFolder() {
  const store = useFolderStore();

  async function loadFolders() {
    const res = await fetchAllFolders();
    const dynamicKey = Object.keys(res).find(
      (key) => key !== "success" && key !== "message"
    );
    const folders = (res[dynamicKey as keyof typeof res] || []) as FolderTree[];

    store.setFolders(folders);
    store.resetBreadcrumb(); // reset saat kembali ke root
  }

  async function loadSubfolders(folderId: number) {
    const res = await fetchSubfolders(folderId);
    const dynamicKey = Object.keys(res).find(
      (key) => key !== "success" && key !== "message"
    );
    const folders = (res[dynamicKey as keyof typeof res] || []) as FolderTree[];

    store.setFolders(folders);
  }

  function goBack() {
    store.popBreadcrumb();
    const current = store.selectedFolder;
    if (current) loadSubfolders(current.id);
    else loadFolders(); // jika sudah di root
  }

  function resetBreadcrumb() {
    store.resetBreadcrumb();
  }

  return {
    loadFolders,
    loadSubfolders,
    goBack,
    resetBreadcrumb,
  };
}

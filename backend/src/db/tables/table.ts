import { createFolderTable } from "./folder.table";
import { createFileTable } from "./file.table";

export async function createAllTables() {
  await createFolderTable();
  await createFileTable();
}

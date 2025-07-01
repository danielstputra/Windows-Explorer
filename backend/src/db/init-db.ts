import { ensureDatabaseExists } from "./db";
import { createAllTables } from "./tables/table";
import { runAllSeeders } from "./seeders/seed";

export async function initializeDatabase(create: boolean) {
  if (create) {
    await ensureDatabaseExists();
    await createAllTables();
    await runAllSeeders();
  }
}

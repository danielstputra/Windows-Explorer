import { seedFolders } from "./folder.seeder";
import { seedFiles } from "./file.seeder";

export async function runAllSeeders() {
  try {
    console.log("✅ Running all seeders...");

    await seedFolders();
    await seedFiles();

    console.log("✅ All seeders finished.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder failed:", error);
    process.exit(1);
  }
}

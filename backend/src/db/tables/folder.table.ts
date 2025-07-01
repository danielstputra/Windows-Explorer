import {
  pool,
  fetchAll,
  fetchById,
  typedQuery,
  insertOne,
  deleteById,
} from "../db";

export async function createFolderTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS folders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      parent_id INT DEFAULT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_parent_folder FOREIGN KEY (parent_id) REFERENCES folders(id) ON DELETE SET NULL
    ) ENGINE=InnoDB
    DEFAULT CHARSET=utf8mb4
    COLLATE=utf8mb4_general_ci;
  `);
  console.log("✅ Table 'folders' ensured");
}

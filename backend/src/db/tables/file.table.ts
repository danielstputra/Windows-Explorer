import {
  pool,
  fetchAll,
  fetchById,
  typedQuery,
  insertOne,
  deleteById,
} from "../db";

export async function createFileTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS files (
      id INT AUTO_INCREMENT PRIMARY KEY,
      folder_id INT NOT NULL,
      name VARCHAR(255) NOT NULL,
      size INT DEFAULT 0,
      mime_type VARCHAR(100),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_folder_file FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE CASCADE
    ) ENGINE=InnoDB
    DEFAULT CHARSET=utf8mb4
    COLLATE=utf8mb4_general_ci;
  `);
  console.log("✅ Table 'files' ensured");
}

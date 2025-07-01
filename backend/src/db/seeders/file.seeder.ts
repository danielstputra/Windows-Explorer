import {
  pool,
  fetchAll,
  fetchById,
  typedQuery,
  insertOne,
  deleteById,
} from "../db";
import type { RowDataPacket } from "mysql2";

export async function seedFiles() {
  const [folders] = await pool.query<RowDataPacket[]>("SELECT id FROM folders");

  if (!folders || folders.length === 0) {
    console.warn("⚠️ No folders found. Skipping file seed.");
    return;
  }

  const sampleFiles = [
    { name: "document.pdf", size: 204800, mime_type: "application/pdf" },
    { name: "photo.jpg", size: 512000, mime_type: "image/jpeg" },
    { name: "music.mp3", size: 1048576, mime_type: "audio/mpeg" },
    { name: "video.mp4", size: 2097152, mime_type: "video/mp4" },
    {
      name: "spreadsheet.xlsx",
      size: 307200,
      mime_type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  ];

  for (const folder of folders) {
    const values = sampleFiles.map((file, i) => [
      folder.id,
      `${i + 1}_${file.name}`,
      file.size,
      file.mime_type,
    ]);

    await pool.query(
      `INSERT INTO files (folder_id, name, size, mime_type)
    VALUES ?`,
      [values]
    );
  }

  console.log(
    `✅ Seeded ${sampleFiles.length} files for ${folders.length} folders.`
  );
}

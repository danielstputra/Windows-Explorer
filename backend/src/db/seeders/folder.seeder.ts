import {
  pool,
  fetchAll,
  fetchById,
  typedQuery,
  insertOne,
  deleteById,
} from "../db";

export async function seedFolders() {
  const countResult = await pool.query("SELECT COUNT(*) as count FROM folders");
  const count = (countResult[0] as any)[0]?.count || 0;

  if (count > 0) {
    console.log("ℹ️ Folder table already seeded. Skipping.");
    return;
  }

  const rootFolders = ["Documents", "Media", "Projects"];
  const rootIds: number[] = [];

  for (const name of rootFolders) {
    const [result] = await pool.query(
      `INSERT INTO folders (name, parent_id) VALUES (?, NULL)`,
      [name]
    );
    const insertId = (result as any).insertId;
    rootIds.push(insertId);
  }

  for (const [i, parentId] of rootIds.entries()) {
    const subfolders = [
      `${rootFolders[i]} - Sub 1`,
      `${rootFolders[i]} - Sub 2`,
    ];
    for (const name of subfolders) {
      await pool.query(`INSERT INTO folders (name, parent_id) VALUES (?, ?)`, [
        name,
        parentId,
      ]);
    }
  }

  const [rows] = await pool.query<any[]>(
    "SELECT id FROM folders WHERE name LIKE 'Documents - Sub 1%' LIMIT 1"
  );

  const subFolder = rows[0];
  if (subFolder?.id) {
    await pool.query(`INSERT INTO folders (name, parent_id) VALUES (?, ?)`, [
      "Deep Folder A",
      subFolder.id,
    ]);
  }

  console.log("✅ Seeded folders with nested hierarchy.");
}

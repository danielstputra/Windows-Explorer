import { config } from "../config";
import mysql from "mysql2/promise";
import type { RowDataPacket, ResultSetHeader, OkPacket } from "mysql2";

const connection = await mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  database: config.db.name,
  password: config.db.password,
});

export const pool = mysql.createPool({
  host: config.db.host,
  port: Number(config.db.port),
  user: config.db.user,
  password: config.db.password,
  database: config.db.name,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function ensureDatabaseExists() {
  await connection.query(`
    CREATE DATABASE IF NOT EXISTS \`${config.db.name}\`
    DEFAULT CHARACTER SET = 'utf8mb4'
    DEFAULT COLLATE = 'utf8mb4_general_ci';
  `);

  console.log(`✅ Database '${config.db.name}' ensured`);
  await connection.end();
}

export async function typedQuery<T>(sql: string, params?: any[]): Promise<T[]> {
  const [rows] = await pool.query<RowDataPacket[]>(sql, params);
  return rows as T[];
}

export async function fetchById<T>(
  table: string,
  id: number
): Promise<T | null> {
  const rows = await typedQuery<T>(
    `SELECT * FROM \`${table}\` WHERE id = ? LIMIT 1`,
    [id]
  );
  return rows[0] ?? null;
}

export async function fetchAll<T>(table: string): Promise<T[]> {
  return typedQuery<T>(`SELECT * FROM \`${table}\``);
}

export async function insertOne(
  table: string,
  data: Record<string, any>
): Promise<number> {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO \`${table}\` (${Object.keys(data).join(
      ","
    )}) VALUES (${Object.keys(data)
      .map(() => "?")
      .join(",")})`,
    Object.values(data)
  );
  return result.insertId;
}

export async function updateById(
  table: string,
  id: number,
  data: Record<string, any>
): Promise<boolean> {
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE \`${table}\` SET ${Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ")} WHERE id = ?`,
    [...Object.values(data), id]
  );
  return result.affectedRows > 0;
}

export async function deleteById(table: string, id: number): Promise<boolean> {
  const [result] = await pool.query<ResultSetHeader>(
    `DELETE FROM \`${table}\` WHERE id = ?`,
    [id]
  );
  return result.affectedRows > 0;
}

export async function truncate(table: string): Promise<void> {
  await pool.query(`TRUNCATE TABLE \`${table}\``);
}

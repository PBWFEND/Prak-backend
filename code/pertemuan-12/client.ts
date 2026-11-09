/**
 * Pertemuan 12 — Prisma Client.
 * Tujuan: menyediakan satu instance Prisma dengan URL database dari konfigurasi
 *         terpusat, sehingga lokasi database tidak ditulis ulang di setiap modul.
 * Cara menjalankan: konfigurasi .env, lalu jalankan server.ts.
 * Contoh pengujian: GET /api/buku mengembalikan daftar buku dari SQLite.
 */

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "./prisma/generated/client.ts";
import { konfigurasi } from "./src/config/env.ts";

// Adapter menerima URL dari konfigurasi; jika DATABASE_URL tidak valid, proses
// berhenti saat modul ini dimuat, sebelum server membuka port.
const adapter = new PrismaBetterSqlite3({ url: konfigurasi.databaseUrl });

const prisma = new PrismaClient({ adapter });

export { prisma };

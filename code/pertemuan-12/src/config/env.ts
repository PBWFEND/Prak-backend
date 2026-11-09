/**
 * Pertemuan 12 — Konfigurasi environment terpusat.
 * Tujuan: membaca, memvalidasi, dan membekukan konfigurasi satu kali di awal proses
 *         agar nilai yang salah ketahuan sebelum server menerima request.
 * Cara menjalankan: diimpor oleh client.ts, app.ts, dan server.ts.
 * Contoh pengujian: set PORT=abc pada .env, lalu jalankan server; proses berhenti
 *                   dengan pesan yang menyebut nama variabel yang salah.
 */

import "dotenv/config";

/** Lingkungan yang dikenali aplikasi. */
export type Lingkungan = "development" | "test" | "production";

/** Tingkat log yang didukung logger. */
export type TingkatLog = "debug" | "info" | "warn" | "error";

export type Konfigurasi = {
  nodeEnv: Lingkungan;
  port: number;
  databaseUrl: string;
  logLevel: TingkatLog;
  corsOrigin: string[];
};

/**
 * Membaca teks wajib. Nilai kosong dianggap tidak diisi karena berkas .env sering
 * menyisakan tanda kutip tanpa isi, dan string kosong yang lolos ke lapisan
 * berikutnya akan menimbulkan error yang lebih sulit dilacak.
 */
const bacaTeks = (nama: string, cadangan?: string): string => {
  const mentah = process.env[nama];
  const nilai = typeof mentah === "string" ? mentah.trim() : "";
  if (nilai !== "") return nilai;
  if (cadangan !== undefined) return cadangan;
  throw new Error(`Konfigurasi ${nama} wajib diisi`);
};

/**
 * Membaca angka positif. Nilai yang tidak valid menghentikan proses, bukan diganti
 * dengan nilai cadangan, supaya salah konfigurasi tidak berjalan diam-diam.
 * Pengecekan typeof memastikan konversi Number hanya menerima string.
 */
const bacaAngka = (nama: string, cadangan: number): number => {
  const mentah = process.env[nama];
  const nilai = typeof mentah === "string" ? mentah.trim() : "";
  if (nilai === "") return cadangan;
  const angka = Number(nilai);
  if (!Number.isInteger(angka) || angka <= 0) {
    throw new Error(`Konfigurasi ${nama} harus bilangan bulat positif, diterima "${nilai}"`);
  }
  return angka;
};

/** NODE_ENV menentukan perilaku logger dan pemilihan nilai bawaan; nilai asing dianggap development. */
const bacaLingkungan = (): Lingkungan => {
  const nilai = bacaTeks("NODE_ENV", "development");
  if (nilai === "production" || nilai === "test") return nilai;
  return "development";
};

/** LOG_LEVEL menentukan batas bawah log; nilai di luar daftar jatuh ke info agar log tetap terlihat. */
const bacaTingkatLog = (): TingkatLog => {
  const nilai = bacaTeks("LOG_LEVEL", "info").toLowerCase();
  if (nilai === "debug" || nilai === "warn" || nilai === "error") return nilai;
  return "info";
};

/** Daftar origin CORS dipisah koma; entri kosong dibuang agar hasil tidak memuat string kosong. */
const bacaDaftarOrigin = (): string[] =>
  bacaTeks("CORS_ORIGIN", "http://localhost:5173")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

/**
 * Membaca seluruh konfigurasi. Fungsi ini dipanggil saat modul dimuat sehingga
 * error konfigurasi muncul sebelum server membuka port, bukan saat request pertama.
 */
export const muatKonfigurasi = (): Konfigurasi => ({
  nodeEnv: bacaLingkungan(),
  port: bacaAngka("PORT", 3012),
  databaseUrl: bacaTeks("DATABASE_URL", "file:./prisma/dev.db"),
  logLevel: bacaTingkatLog(),
  corsOrigin: bacaDaftarOrigin(),
});

/** Objek dibekukan agar modul lain tidak mengubah nilai konfigurasi saat runtime. */
export const konfigurasi = Object.freeze(muatKonfigurasi());

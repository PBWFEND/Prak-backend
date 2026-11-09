/**
 * Pertemuan 12 — Logger terstruktur berbasis baris JSON.
 * Tujuan: menulis log dengan waktu, tingkat, pesan, dan konteks agar dapat dibaca
 *         manusia sekaligus disaring oleh sistem pengumpul log.
 * Cara menjalankan: diimpor oleh middleware, error handler, dan server.
 * Contoh pengujian: set LOG_LEVEL=warn, lalu jalankan server; baris log info
 *                   tidak muncul, sedangkan peringatan dan error tetap ditulis.
 */

import { konfigurasi } from "../config/env.ts";

export type TingkatLog = "debug" | "info" | "warn" | "error";

/** Konteks tambahan yang ditempelkan pada baris log, misalnya requestId atau durasi. */
type Konteks = Record<string, unknown>;

/** Angka pembanding menentukan apakah sebuah log lolos ambang LOG_LEVEL. */
const bobot: Record<TingkatLog, number> = { debug: 10, info: 20, warn: 30, error: 40 };

/**
 * Kunci yang isinya tidak boleh tercatat. Daftar ini sengaja mencakup nama umum
 * pada request authentication agar nilai sensitif tidak ikut tersimpan di log.
 */
const KUNCI_SENSITIF = new Set([
  "password",
  "katasandi",
  "token",
  "authorization",
  "secret",
  "cookie",
]);

/**
 * Mengganti nilai sensitif dengan penanda sebelum log ditulis. Fungsi berjalan
 * rekursif karena konteks dapat memuat objek bersarang, dan setiap tingkat
 * harus diperiksa agar kunci sensitif tidak lolos.
 */
const redaksi = (nilai: unknown): unknown => {
  if (nilai === null || typeof nilai !== "object") return nilai;
  if (Array.isArray(nilai)) return nilai.map(redaksi);

  const hasil: Record<string, unknown> = {};
  for (const [kunci, isi] of Object.entries(nilai as Record<string, unknown>)) {
    hasil[kunci] = KUNCI_SENSITIF.has(kunci.toLowerCase()) ? "[REDACTED]" : redaksi(isi);
  }
  return hasil;
};

/**
 * Menulis satu baris JSON. Level warn dan error dikirim ke stderr agar dapat
 * dipisahkan dari log informasi oleh sistem pengumpul log; level di bawah
 * ambang konfigurasi diabaikan agar keluaran tidak terlalu ramai.
 */
const tulis = (tingkat: TingkatLog, pesan: string, konteks: Konteks) => {
  if (bobot[tingkat] < bobot[konfigurasi.logLevel]) return;

  const entri = {
    waktu: new Date().toISOString(),
    tingkat,
    pesan,
    ...(redaksi(konteks) as Konteks),
  };
  const teks = `${JSON.stringify(entri)}\n`;

  if (tingkat === "warn" || tingkat === "error") {
    process.stderr.write(teks);
    return;
  }
  process.stdout.write(teks);
};

/** Antarmuka pemakaian logger; setiap method hanya meneruskan tingkat yang sesuai. */
export const logger = {
  debug: (pesan: string, konteks: Konteks = {}) => tulis("debug", pesan, konteks),
  info: (pesan: string, konteks: Konteks = {}) => tulis("info", pesan, konteks),
  warn: (pesan: string, konteks: Konteks = {}) => tulis("warn", pesan, konteks),
  error: (pesan: string, konteks: Konteks = {}) => tulis("error", pesan, konteks),
};

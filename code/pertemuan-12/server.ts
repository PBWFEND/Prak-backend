/**
 * Pertemuan 12 — Proses server dan penghentian yang terkendali.
 * Tujuan: menjalankan Express dari konfigurasi terpusat, menutup koneksi Prisma
 *         saat menerima sinyal penghentian, serta mencatat kegagalan tak tertangani.
 * Cara menjalankan: npm start setelah migration dan generate Prisma.
 * Contoh pengujian: curl -i http://localhost:3012/health lalu tekan Ctrl+C;
 *                   log mencatat sinyal SIGINT dan server berhenti dengan bersih.
 */

import { app } from "./app.ts";
import { prisma } from "./client.ts";
import { konfigurasi } from "./src/config/env.ts";
import { logger } from "./src/logger/logger.ts";

const server = app.listen(konfigurasi.port, () => {
  logger.info("server berjalan", {
    port: konfigurasi.port,
    lingkungan: konfigurasi.nodeEnv,
    tingkatLog: konfigurasi.logLevel,
  });
});

/**
 * Menghentikan server secara bertahap: berhenti menerima request baru, tunggu
 * request yang sedang berjalan selesai, lalu putuskan koneksi database. Batas
 * waktu dipasang agar proses tidak menggantung jika ada request yang macet.
 */
const tutupDenganAman = (sinyal: string) => {
  logger.info("sinyal penghentian diterima", { sinyal });

  const batasWaktu = setTimeout(() => {
    logger.error("penghentian melebihi batas waktu, proses dihentikan paksa", { sinyal });
    process.exit(1);
  }, 10_000);

  // Timer tidak perlu menahan proses tetap hidup hanya karena menunggu batas waktu.
  batasWaktu.unref();

  server.close(() => {
    void prisma.$disconnect().finally(() => {
      clearTimeout(batasWaktu);
      logger.info("server berhenti dengan bersih", { sinyal });
      process.exit(0);
    });
  });
};

process.on("SIGINT", () => tutupDenganAman("SIGINT"));
process.on("SIGTERM", () => tutupDenganAman("SIGTERM"));

// Promise yang ditolak tanpa penanganan dicatat agar penyebabnya terlihat;
// proses tetap berjalan karena satu operasi gagal belum tentu merusak server.
process.on("unhandledRejection", (alasan) => {
  logger.error("promise ditolak tanpa penanganan", {
    pesan: alasan instanceof Error ? alasan.message : "nilai bukan Error",
  });
});

// Exception yang tidak tertangkap menandakan keadaan proses tidak dapat
// dipulihkan, sehingga proses dihentikan setelah koneksi database ditutup.
process.on("uncaughtException", (error) => {
  logger.error("exception tidak tertangkap, proses dihentikan", {
    pesan: error.message,
    stack: error.stack,
  });
  void prisma.$disconnect().finally(() => process.exit(1));
});

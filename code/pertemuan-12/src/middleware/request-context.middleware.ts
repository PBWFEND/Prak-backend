/**
 * Pertemuan 12 — Konteks request: request id dan log akses.
 * Tujuan: memberi setiap request pengenal unik serta mencatat metode, path,
 *         status, dan durasi agar log mudah dihubungkan dengan satu permintaan.
 * Cara menjalankan: dipasang pada app.ts sebelum route bisnis.
 * Contoh pengujian: respons /health membawa header X-Request-Id, dan log
 *                   memuat requestId yang sama beserta durasi dalam milidetik.
 */

import { randomUUID } from "node:crypto";
import { performance } from "node:perf_hooks";
import type { Request, RequestHandler } from "express";
import { logger } from "../logger/logger.ts";

/** Request yang sudah diberi ID oleh beriRequestId. */
export type RequestBerId = Request & { requestId?: string };

/**
 * Menempelkan ID unik pada request. Header X-Request-Id dikirim balik ke client
 * agar pengguna dapat menyebutkan ID tersebut ketika melaporkan masalah, dan
 * tim server dapat mencari baris log yang sesuai.
 */
export const beriRequestId: RequestHandler = (request, response, next) => {
  const id = randomUUID();
  (request as RequestBerId).requestId = id;
  response.setHeader("X-Request-Id", id);
  next();
};

/**
 * Mencatat log ketika respons selesai. Durasi diukur dengan performance.now()
 * yang mengembalikan number sehingga tidak perlu konversi dari nilai lain.
 * Event finish dipilih karena pada saat itulah status code sudah pasti.
 */
export const catatAkses: RequestHandler = (request, response, next) => {
  const mulai = performance.now();

  response.on("finish", () => {
    logger.info("request selesai", {
      requestId: (request as RequestBerId).requestId ?? "-",
      method: request.method,
      path: request.originalUrl,
      status: response.statusCode,
      // Dibulatkan dua desimal agar log tetap ringkas namun cukup presisi.
      durasiMs: Math.round((performance.now() - mulai) * 100) / 100,
    });
  });

  next();
};

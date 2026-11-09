/**
 * Pertemuan 12 — Error handler terpusat.
 * Tujuan: memetakan setiap kegagalan menjadi status HTTP, kode, dan pesan yang
 *         konsisten, serta mencatat detail internal hanya pada log server.
 * Cara menjalankan: dipasang paling akhir pada app.ts, setelah seluruh route.
 * Contoh pengujian: GET /api/buku/999 menghasilkan 404 dengan kode NOT_FOUND;
 *                   POST data duplikat menghasilkan 409 dengan kode CONFLICT.
 */

import type { ErrorRequestHandler } from "express";
import { Prisma } from "../../prisma/generated/client.ts";
import { logger } from "../logger/logger.ts";
import { AppError, type KodeError } from "./app-error.ts";
import type { RequestBerId } from "../middleware/request-context.middleware.ts";

/** Bentuk data yang siap dikirim pada response error. */
type MuatanError = {
  statusCode: number;
  code: KodeError;
  message: string;
  details?: unknown;
};

/** Error dari aplikasi sudah disusun untuk client sehingga dapat diteruskan apa adanya. */
const dariAppError = (error: AppError): MuatanError => ({
  statusCode: error.statusCode,
  code: error.code,
  message: error.message,
  ...(error.details !== undefined ? { details: error.details } : {}),
});

/**
 * Body parser Express memberi tanda pada error-nya melalui properti type.
 * JSON rusak dianggap kesalahan client (400), sedangkan body terlalu besar
 * memakai 413 agar client tahu batas yang dilampaui.
 */
const dariBodyParser = (error: Error): MuatanError | undefined => {
  const tipe = (error as Error & { type?: string }).type;
  if (tipe === "entity.parse.failed") {
    return { statusCode: 400, code: "VALIDATION_ERROR", message: "Body JSON tidak valid" };
  }
  if (tipe === "entity.too.large") {
    return { statusCode: 413, code: "VALIDATION_ERROR", message: "Ukuran body melebihi batas" };
  }
  return undefined;
};

/**
 * Error Prisma dipetakan berdasarkan kode yang stabil: P2002 (unique constraint)
 * menjadi 409 dan P2025 (record yang dituju tidak ada) menjadi 404. Kode lain
 * dibiarkan jatuh ke 500 karena menandakan masalah skema atau koneksi database.
 */
const dariPrisma = (error: unknown): MuatanError | undefined => {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) return undefined;
  if (error.code === "P2002") {
    return { statusCode: 409, code: "CONFLICT", message: "Data dengan nilai unik tersebut sudah ada" };
  }
  if (error.code === "P2025") {
    return { statusCode: 404, code: "NOT_FOUND", message: "Resource tidak ditemukan" };
  }
  return undefined;
};

/**
 * Urutan pemeriksaan penting: AppError lebih dulu agar statusnya tidak tertimpa,
 * lalu error body parser, lalu error Prisma. Kegagalan yang tidak dikenali
 * menghasilkan pesan umum supaya detail internal tidak bocor ke client.
 */
const petakan = (error: unknown): MuatanError => {
  if (error instanceof AppError) return dariAppError(error);

  if (error instanceof Error) {
    const dariParser = dariBodyParser(error);
    if (dariParser) return dariParser;
  }

  const dariDb = dariPrisma(error);
  if (dariDb) return dariDb;

  return { statusCode: 500, code: "INTERNAL", message: "Terjadi kesalahan pada server" };
};

/**
 * Middleware error wajib memiliki empat parameter agar Express mengenalinya
 * sebagai error handler. Status 5xx dicatat sebagai error, sedangkan 4xx cukup
 * warning karena berasal dari masukan client dan bukan kegagalan server.
 */
export const errorHandler: ErrorRequestHandler = (error, request, response, _next) => {
  const requestId = (request as RequestBerId).requestId ?? "-";
  const muatan = petakan(error);

  const konteks = {
    requestId,
    statusCode: muatan.statusCode,
    code: muatan.code,
    ...(error instanceof Error ? { errorName: error.name } : {}),
  };

  if (muatan.statusCode >= 500) {
    logger.error("request gagal", {
      ...konteks,
      stack: error instanceof Error ? error.stack : undefined,
    });
  } else {
    logger.warn("request ditolak", konteks);
  }

  response.status(muatan.statusCode).json({
    success: false,
    code: muatan.code,
    message: muatan.message,
    ...(muatan.details !== undefined ? { details: muatan.details } : {}),
    requestId,
  });
};

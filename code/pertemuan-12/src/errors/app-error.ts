/**
 * Pertemuan 12 — Kelas error aplikasi.
 * Tujuan: membawa status HTTP, kode, dan detail yang aman dikirim ke client
 *         sehingga handler tidak perlu menebak bentuk response.
 * Cara menjalankan: dilempar oleh controller/service, lalu ditangani error-handler.
 * Contoh pengujian: POST /api/buku dengan body kosong menghasilkan 400
 *                   dengan kode VALIDATION_ERROR.
 */

/** Kode error yang dikenal client; kode ini stabil dan berbeda dari pesan yang dapat berubah. */
export type KodeError = "VALIDATION_ERROR" | "NOT_FOUND" | "CONFLICT" | "INTERNAL";

/**
 * AppError membedakan kesalahan yang sudah diperkirakan (operational) dari bug
 * yang tidak terduga. Field isOperational dipakai error handler untuk memutuskan
 * apakah pesan boleh diteruskan ke client.
 */
export class AppError extends Error {
  readonly statusCode: number;
  readonly code: KodeError;
  readonly details?: unknown;
  readonly isOperational: boolean;

  constructor(
    pesan: string,
    statusCode: number,
    code: KodeError,
    details?: unknown,
    isOperational = true,
  ) {
    super(pesan);
    // Nama kelas disetel ulang agar stack trace menyebut AppError, bukan Error.
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = isOperational;
  }
}

/** Kesalahan masukan client; status 400 menandakan masukan ditolak, bukan kegagalan server. */
export const validationError = (details: unknown, pesan = "Data tidak valid"): AppError =>
  new AppError(pesan, 400, "VALIDATION_ERROR", details);

/** Resource tidak ditemukan; dipakai service agar controller tidak memilih status sendiri. */
export const notFoundError = (pesan = "Resource tidak ditemukan"): AppError =>
  new AppError(pesan, 404, "NOT_FOUND");

/** Bentrok data, misalnya unique constraint; status 409 memberi tahu client bahwa data sudah ada. */
export const conflictError = (pesan = "Data sudah ada"): AppError =>
  new AppError(pesan, 409, "CONFLICT");

/**
 * Pertemuan 12 — Middleware untuk endpoint yang tidak ditemukan.
 * Tujuan: mengubah 404 menjadi AppError agar melewati error handler terpusat
 *         sehingga format response error tetap seragam.
 * Cara menjalankan: dipasang pada app.ts setelah seluruh route.
 * Contoh pengujian: GET /tidak-ada menghasilkan 404 dengan kode NOT_FOUND.
 */

import type { RequestHandler } from "express";
import { notFoundError } from "../errors/app-error.ts";

/**
 * Meneruskan error ke next() agar response ditulis oleh error handler. Dengan
 * pola ini, 404 memiliki bentuk yang sama dengan kegagalan lain dan tercatat
 * pada log dengan requestId yang sama.
 */
export const tanganiTidakDitemukan: RequestHandler = (request, _response, next) => {
  next(notFoundError(`Endpoint ${request.method} ${request.originalUrl} tidak ditemukan`));
};

/**
 * Pertemuan 12 — Middleware keamanan dasar.
 * Tujuan: mempertahankan security header dan CORS selektif dari Pertemuan 11
 *         agar respons, termasuk respons error, tetap membawa header tersebut.
 * Cara menjalankan: dipasang pada app.ts sebelum route bisnis.
 * Contoh pengujian: curl -i http://localhost:3012/health menampilkan header helmet.
 */

import cors from "cors";
import helmet from "helmet";
import { konfigurasi } from "../config/env.ts";

/** Security header dipasang sejak awal agar respons 404 dan 500 juga membawanya. */
export const securityHeaders = helmet();

/**
 * CORS hanya mengizinkan origin yang tercantum pada konfigurasi. Request tanpa
 * Origin (curl atau Postman) dilewatkan karena aturan CORS ditegakkan browser,
 * bukan server.
 */
export const corsTerbatas = cors({
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true);
      return;
    }
    callback(null, konfigurasi.corsOrigin.includes(origin));
  },
});

/**
 * Pertemuan 12 — Aplikasi Express dengan error handling terpusat.
 * Tujuan: menyusun urutan middleware (konteks request, log akses, keamanan, body
 *         parser), memasang route, lalu menutup rantai dengan 404 dan error handler.
 * Cara menjalankan: node --experimental-strip-types server.ts.
 * Contoh pengujian: GET /health (200), GET /tidak-ada (404), POST body rusak (400).
 */

import express, { type Request, type Response } from "express";
import { bukuRoutes } from "./src/routes/buku.routes.ts";
import { beriRequestId, catatAkses } from "./src/middleware/request-context.middleware.ts";
import { corsTerbatas, securityHeaders } from "./src/middleware/security.middleware.ts";
import { tanganiTidakDitemukan } from "./src/middleware/not-found.middleware.ts";
import { errorHandler } from "./src/errors/error-handler.ts";

const app = express();
app.disable("x-powered-by");

// Request id dan log akses dipasang paling awal agar setiap request, termasuk
// yang ditolak, memiliki penanda yang sama pada log.
app.use(beriRequestId);
app.use(catatAkses);

// Header keamanan dan CORS mengikuti Pertemuan 11; keduanya dipasang sebelum
// route supaya response error juga membawa header yang sama.
app.use(securityHeaders);
app.use(corsTerbatas);

// Batas ukuran body mencegah payload besar menghabiskan memori. Error yang
// muncul dari parser ini dipetakan error handler menjadi 400 atau 413.
app.use(express.json({ limit: "100kb" }));

// Endpoint kesehatan dipakai untuk memastikan proses siap menerima request.
app.get("/health", (_request: Request, response: Response) => {
  response.status(200).json({ success: true, data: { status: "up" } });
});

app.use("/api/buku", bukuRoutes);

// 404 dikonversi menjadi AppError agar format response dan log seragam dengan
// kegagalan lain. Middleware ini harus berada setelah seluruh route.
app.use(tanganiTidakDitemukan);

// Error handler berada paling akhir karena Express memanggilnya hanya ketika
// ada error yang diteruskan melalui next() atau rejection handler async.
app.use(errorHandler);

export { app };

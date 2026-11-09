/**
 * Pertemuan 12 — Route resource buku.
 * Tujuan: memetakan endpoint buku ke controller tanpa logika tambahan agar
 *         seluruh penanganan kesalahan tetap berada pada rantai middleware.
 * Cara menjalankan: route dipasang oleh app.ts pada prefix /api/buku.
 * Contoh pengujian: GET /api/buku, GET /api/buku/1, dan POST /api/buku.
 */

import { Router } from "express";
import {
  handlerBuatBuku,
  handlerDaftarBuku,
  handlerDetailBuku,
} from "../controller/buku.controller.ts";

const bukuRoutes = Router();

// Handler async pada Express 5 meneruskan rejection ke error handler terpusat,
// sehingga route tidak perlu membungkus setiap handler dengan try/catch.
bukuRoutes.get("/", handlerDaftarBuku);
bukuRoutes.get("/:id", handlerDetailBuku);
bukuRoutes.post("/", handlerBuatBuku);

export { bukuRoutes };

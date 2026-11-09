/**
 * Pertemuan 12 — Controller resource buku.
 * Tujuan: memvalidasi masukan, memanggil service, dan membiarkan kegagalan
 *         dilempar sebagai AppError agar ditangani error handler terpusat.
 * Cara menjalankan: handler dipasangkan pada buku.routes.ts.
 * Contoh pengujian: POST /api/buku dengan body tidak lengkap menghasilkan 400;
 *                   Express 5 meneruskan error dari handler async secara otomatis.
 */

import type { Request, RequestHandler } from "express";
import { validationError } from "../errors/app-error.ts";
import { ambilBuku, buatBuku, daftarBuku } from "../service/buku.service.ts";

type DataBuku = {
  judul: string;
  penulis: string;
  stok: number;
};

type FilterBuku = {
  judul?: string;
  minStok?: number;
};

/** Prisma Int memakai rentang signed 32-bit; menolak nilai di luarnya mencegah error database. */
const stokValid = (value: unknown): value is number =>
  typeof value === "number"
  && Number.isSafeInteger(value)
  && value >= 0
  && value <= 2_147_483_647;

/**
 * Membaca route parameter id. Nilai diperiksa sebagai string terlebih dahulu
 * karena Express dapat menerima bentuk lain pada konfigurasi tertentu; setelah
 * dipastikan string, barulah dikonversi menjadi angka.
 */
const bacaId = (idMentah: Request["params"][string]): number => {
  const nilai = typeof idMentah === "string" ? Number(idMentah) : undefined;
  if (typeof idMentah !== "string" || !/^\d+$/.test(idMentah) || nilai === undefined) {
    throw validationError(["Parameter id harus berupa bilangan bulat positif"]);
  }
  return nilai;
};

/**
 * Membaca dan memvalidasi query string. Semua kesalahan dikumpulkan lebih dulu
 * agar client dapat memperbaiki beberapa field sekaligus dalam satu percobaan.
 */
const bacaFilter = (query: Request["query"]): FilterBuku => {
  const errors: string[] = [];
  const filter: FilterBuku = {};

  const judulMentah = query.judul;
  if (judulMentah !== undefined) {
    if (typeof judulMentah !== "string") {
      errors.push("judul harus berupa teks tunggal");
    } else if (judulMentah.length > 100) {
      errors.push("judul maksimal 100 karakter");
    } else {
      filter.judul = judulMentah;
    }
  }

  const stokMentah = query.minStok;
  if (stokMentah !== undefined) {
    const nilai = typeof stokMentah === "string" ? Number(stokMentah) : undefined;
    if (typeof stokMentah !== "string" || !/^\d+$/.test(stokMentah) || nilai === undefined) {
      errors.push("minStok harus berupa bilangan bulat non-negatif");
    } else {
      filter.minStok = nilai;
    }
  }

  if (errors.length > 0) throw validationError(errors);
  return filter;
};

/**
 * Membaca body sebagai object lalu mengekstrak field dengan guard typeof.
 * Nilai tidak dipotong secara diam-diam; kesalahan dikembalikan sebagai daftar
 * agar client mengetahui field yang perlu diperbaiki.
 */
const bacaBuku = (body: unknown): DataBuku => {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    throw validationError(["Body harus berupa object JSON"]);
  }

  const record = body as Record<string, unknown>;
  const judul = typeof record.judul === "string" ? record.judul.trim() : "";
  const penulis = typeof record.penulis === "string" ? record.penulis.trim() : "";
  const stokMentah = record.stok;
  const errors: string[] = [];

  if (judul === "") {
    errors.push("judul wajib diisi");
  } else if (judul.length > 100) {
    errors.push("judul maksimal 100 karakter");
  }

  if (penulis === "") {
    errors.push("penulis wajib diisi");
  } else if (penulis.length > 80) {
    errors.push("penulis maksimal 80 karakter");
  }

  let stok = 0;
  if (stokValid(stokMentah)) {
    stok = stokMentah;
  } else if (stokMentah !== undefined) {
    errors.push("stok harus berupa bilangan bulat non-negatif");
  }

  if (errors.length > 0) throw validationError(errors);
  return { judul, penulis, stok };
};

/** GET /api/buku — daftar buku dengan filter opsional. */
export const handlerDaftarBuku: RequestHandler = async (request, response) => {
  const buku = await daftarBuku(bacaFilter(request.query));
  response.status(200).json({ success: true, message: "Daftar buku", data: buku });
};

/** GET /api/buku/:id — detail satu buku; 404 dilempar oleh service. */
export const handlerDetailBuku: RequestHandler = async (request, response) => {
  const buku = await ambilBuku(bacaId(request.params.id));
  response.status(200).json({ success: true, message: "Detail buku", data: buku });
};

/** POST /api/buku — membuat buku baru; duplikat ditangani error handler sebagai 409. */
export const handlerBuatBuku: RequestHandler = async (request, response) => {
  const buku = await buatBuku(bacaBuku(request.body));
  response.status(201).json({ success: true, message: "Buku dibuat", data: buku });
};

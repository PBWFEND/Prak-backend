/**
 * Pertemuan 12 — Service resource buku.
 * Tujuan: memusatkan operasi database dan melempar AppError ketika aturan bisnis
 *         tidak terpenuhi, sehingga controller tidak perlu memilih status code.
 * Cara menjalankan: fungsi dipanggil oleh buku.controller.ts.
 * Contoh pengujian: GET /api/buku/999 melempar NOT_FOUND dari ambilBuku.
 */

import { prisma } from "../../client.ts";
import { notFoundError } from "../errors/app-error.ts";

type DataBuku = {
  judul: string;
  penulis: string;
  stok: number;
};

type FilterBuku = {
  judul?: string;
  minStok?: number;
};

/**
 * Daftar buku dengan filter opsional. Nilai filter sudah divalidasi di controller
 * sehingga query hanya dibentuk dari nilai primitif dan tidak rentan injection.
 */
export const daftarBuku = (filter: FilterBuku) => {
  return prisma.buku.findMany({
    where: {
      ...(filter.judul !== undefined ? { judul: { contains: filter.judul } } : {}),
      ...(filter.minStok !== undefined ? { stok: { gte: filter.minStok } } : {}),
    },
    orderBy: { id: "asc" },
  });
};

/**
 * Mengambil satu buku berdasarkan id. Jika tidak ada, service melempar AppError
 * 404 agar controller tidak mengulang pemeriksaan yang sama pada setiap handler.
 */
export const ambilBuku = async (id: number) => {
  const buku = await prisma.buku.findUnique({ where: { id } });
  if (!buku) throw notFoundError(`Buku dengan id ${id} tidak ditemukan`);
  return buku;
};

/**
 * Membuat buku baru. Nilai sudah dibatasi panjang dan rentangnya di controller.
 * Pelanggaran unique constraint tidak ditangani di sini; error handler terpusat
 * memetakan kode P2002 Prisma menjadi 409 agar aturan tersebut tidak tersebar.
 */
export const buatBuku = (data: DataBuku) => {
  return prisma.buku.create({ data });
};

import express, { type Request, type Response } from "express";
import { prisma } from "./client.ts";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

const sendSuccess = (response: Response, statusCode: number, message: string, data: unknown) => {
  return response.status(statusCode).json({ success: true, message, data });
};

const sendError = (response: Response, statusCode: number, message: string, details?: unknown) => {
  return response.status(statusCode).json({ success: false, message, ...(details && { details }) });
};

app.use((request: Request, response: Response, next: () => void) => {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`);
  next();
});

app.get("/", (_request: Request, response: Response) => {
  return sendSuccess(response, 200, "Database API Pertemuan 6", {
    resource: "buku",
    endpoints: [
      "GET /buku",
      "GET /buku/:id",
      "POST /buku",
      "PATCH /buku/:id",
      "DELETE /buku/:id",
    ],
  });
});

app.get("/health", (_request: Request, response: Response) => {
  return sendSuccess(response, 200, "API berjalan", { status: "up" });
});

app.get("/buku", async (request: Request, response: Response) => {
  const { penulis, minStok } = request.query;
  const penulisFilter = penulis !== undefined ? String(penulis) : undefined;
  const minStokFilter = minStok !== undefined ? Number(minStok) : undefined;

  const data = await prisma.buku.findMany({
    where: {
      ...(penulisFilter !== undefined && { penulis: penulisFilter }),
      ...(minStokFilter !== undefined && Number.isNaN(minStokFilter) === false && { stok: { gte: minStokFilter } }),
    },
    orderBy: { judul: "asc" },
  });

  return sendSuccess(response, 200, "Daftar buku berhasil diambil", {
    total: data.length,
    data,
  });
});

app.get("/buku/:id", async (request: Request, response: Response) => {
  const item = await prisma.buku.findFirst({
    where: { id: Number(request.params.id) },
  });

  if (!item) {
    return sendError(response, 404, "Buku tidak ditemukan");
  }

  return sendSuccess(response, 200, "Detail buku berhasil diambil", item);
});

app.post("/buku", async (request: Request, response: Response) => {
  const { judul, penulis, tahun, stok } = request.body as {
    judul?: string;
    penulis?: string;
    tahun?: number;
    stok?: number;
  };

  const errors: string[] = [];
  if (judul === undefined) errors.push("Field judul wajib diisi");
  if (penulis === undefined) errors.push("Field penulis wajib diisi");
  if (tahun === undefined || !Number.isInteger(tahun)) errors.push("Field tahun wajib berupa bilangan bulat");
  if (stok !== undefined && (!Number.isInteger(stok) || stok < 0)) {
    errors.push("Field stok harus bilangan bulat minimal 0");
  }

  if (errors.length > 0) {
    return sendError(response, 400, "Data buku tidak valid", errors);
  }

  const baru = await prisma.buku.create({
    data: {
      judul: judul,
      penulis: penulis,
      tahun: tahun,
      ...(stok !== undefined && { stok: stok }),
    },
  });

  return sendSuccess(response, 201, "Buku berhasil dibuat", baru);
});

app.patch("/buku/:id", async (request: Request, response: Response) => {
  const id = Number(request.params.id);
  const item = await prisma.buku.findFirst({ where: { id } });
  if (!item) return sendError(response, 404, "Buku tidak ditemukan");

  const { stok } = request.body as { stok?: number };
  const errors: string[] = [];
  if (stok !== undefined && (!Number.isInteger(stok) || stok < 0)) {
    errors.push("Field stok harus bilangan bulat minimal 0");
  }
  if (errors.length > 0) return sendError(response, 400, "Data perubahan tidak valid", errors);

  const diperbarui = await prisma.buku.update({
    where: { id },
    data: {
      ...(stok !== undefined && { stok: stok }),
    },
  });

  return sendSuccess(response, 200, "Buku berhasil diperbarui", diperbarui);
});

app.delete("/buku/:id", async (request: Request, response: Response) => {
  const id = Number(request.params.id);
  const item = await prisma.buku.findFirst({ where: { id } });
  if (!item) return sendError(response, 404, "Buku tidak ditemukan");

  await prisma.buku.delete({ where: { id } });
  return response.status(204).send();
});

app.use((_request: Request, response: Response) => {
  return sendError(response, 404, "Endpoint tidak ditemukan");
});

app.use((error: Error, _request: Request, response: Response, _next: () => void) => {
  console.error("Kesalahan aplikasi:", error.message);
  return sendError(response, 500, "Terjadi kesalahan pada server");
});

export { app, prisma };

# Praktikum Pertemuan 12 — Error Handling, Logging, dan Konfigurasi

Contoh API resource buku yang menerapkan penanganan error terpusat, logging terstruktur, konfigurasi environment tervalidasi, dan penghentian terkendali. Project melanjutkan lapisan keamanan dari Pertemuan 11 (security header dan CORS selektif) tanpa rate limiter agar jalur kegagalan dapat diuji dengan leluasa.

## Prasyarat dan Menjalankan

- Node.js 22.12+; Node.js 24 LTS direkomendasikan.
- npm.

```bash
npm install
cp .env.example .env
npx prisma migrate dev --name init
npx prisma generate
npm start
```

Server berjalan di `http://localhost:3012`.

Isi `.env` sebelum menjalankan:

```dotenv
NODE_ENV=development
PORT=3012
DATABASE_URL="file:./prisma/dev.db"
LOG_LEVEL=info
CORS_ORIGIN="http://localhost:5173,http://localhost:3000"
```

## Endpoint

| Method | Endpoint | Sukses | Kondisi gagal |
|:-------|:---------|:------:|:-------------|
| GET | `/health` | 200 | — |
| GET | `/api/buku` | 200 | 400 query tidak valid |
| GET | `/api/buku/:id` | 200 | 400 id tidak valid; 404 tidak ditemukan |
| POST | `/api/buku` | 201 | 400 body tidak valid; 409 duplikat; 413 body terlalu besar |

## Ketahanan Operasional

| Komponen | Implementasi | Tujuan |
|:---------|:-------------|:--------|
| Kelas error | `AppError` dan fungsi pembuat | Membawa status, kode, dan detail yang aman |
| Error handler | `src/errors/error-handler.ts` | Memetakan seluruh kegagalan menjadi response seragam |
| Pemetaan Prisma | Kode `P2002` dan `P2025` | Mengubah bentrok data dan record hilang menjadi 409/404 |
| Logging | `src/logger/logger.ts` | Baris JSON dengan waktu, tingkat, konteks, dan redaksi |
| Korelasi request | `X-Request-Id` dan durasi | Menghubungkan log dengan satu permintaan |
| Konfigurasi | `src/config/env.ts` | Validasi saat start, nilai salah menghentikan proses |
| Penghentian | `SIGINT`/`SIGTERM` dan batas waktu | Menutup koneksi tanpa memutus request berjalan |
| Kegagalan proses | `unhandledRejection`, `uncaughtException` | Mencatat penyebab sebelum proses dihentikan |

## Contoh Pengujian

```bash
curl -i http://localhost:3012/health

curl -i -X POST http://localhost:3012/api/buku \
  -H "Content-Type: application/json" \
  -d '{"judul":"Clean Code","penulis":"Robert Martin","stok":5}'

curl -i -X POST http://localhost:3012/api/buku \
  -H "Content-Type: application/json" \
  -d '{"judul":"Clean Code","penulis":"Robert Martin","stok":5}'

curl -i -X POST http://localhost:3012/api/buku \
  -H "Content-Type: application/json" \
  -d '{"judul":"","penulis":"X","stok":-1}'

curl -i "http://localhost:3012/api/buku?minStok=abc"
curl -i http://localhost:3012/api/buku/999
curl -i http://localhost:3012/tidak-ada
curl -i -X POST http://localhost:3012/api/buku \
  -H "Content-Type: application/json" \
  -d '{broken'
```

Penghentian terkendali: tekan `Ctrl+C`, lalu periksa log yang mencatat sinyal dan penutupan koneksi. Konfigurasi tidak valid:

```bash
PORT=abc npm start
```

## Konfigurasi

| Variabel | Wajib | Bawaan | Aturan |
|:---------|:-----:|:-------|:-------|
| `NODE_ENV` | Tidak | `development` | `development`, `test`, `production` |
| `PORT` | Tidak | `3012` | Bilangan bulat positif |
| `DATABASE_URL` | Tidak | `file:./prisma/dev.db` | Tidak boleh kosong |
| `LOG_LEVEL` | Tidak | `info` | `debug`, `info`, `warn`, `error` |
| `CORS_ORIGIN` | Tidak | `http://localhost:5173` | Daftar origin dipisah koma |

## Batasan

Logger menulis ke `stdout` dan `stderr` tanpa penyimpanan terpusat, rotasi, atau pengiriman ke layanan pemantauan. Redaksi hanya memeriksa nama kunci sehingga nilai sensitif pada teks bebas tidak otomatis tersaring. Konfigurasi belum memakai secret manager, dan pemetaan Prisma mencakup dua kode yang paling umum.

## Struktur

```text
app.ts
server.ts
client.ts
prisma/schema.prisma
src/config/env.ts
src/logger/logger.ts
src/errors/app-error.ts
src/errors/error-handler.ts
src/middleware/request-context.middleware.ts
src/middleware/security.middleware.ts
src/middleware/not-found.middleware.ts
src/routes/buku.routes.ts
src/controller/buku.controller.ts
src/service/buku.service.ts
```

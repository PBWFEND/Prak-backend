# Membuat Schema Table

Setelah berhasil menginstall dan konfigurasi Prisma di dalam project Express, sekarang kita akan lanjutkan membuat schema table di dalam Prisma. Schema ini nanti akan digenerate menjadi sebuah table di dalam database.

## Langkah 1 - Membuat Schema Table
Silahkan teman-teman buka file `prisma/schema.prisma`, kemudian ubah kode-nya menjadi seperti berikut ini.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String?  @db.VarChar(255)
  email     String   @unique(map: "email") @db.VarChar(255)
  password  String?  @db.VarChar(255)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```
Dari perubahan kode di atas, pertama kita ubah `provider` database yang digunakan menjadi `mysql`.

Kemudian kita membuat model baru dengan nama `User` dan di dalamnya kita buat beberapa attribute / kolom yang nanti akan digenerate, berikut ini penjelasan dari masing-masing attribute / kolom di atas.

| ATTRIBUTE	| TYPE DATA	| OPTIONS						|
|------------|-------------|-------------------------------|
| id			| Int			| auto increment				|
| name		| String		| -								|
| email		| String?		| bersifat unique.				|
| password	| String?		| -								|
| createdAt	| DateTime	| -								|
| updatedAt	| DateTime	| -								|

Dan kita tambahkan `@@map('users')` untuk menetapkan bahwa table di atas akan diberi nama `users`.

## Langkah 2 - Menjalankan Proses Migrate

Sekarang kita akan belajar menjalankan proses migrate, dengan menjalankan proses ini, maka kita akan dibuatkan database baru sesuai yang kita deklarasikan di dalam file `.env` dan beserta table `users` yang ada di dalam schema Prisma.

Silahkan jalankan perintah berikut ini di dalam terminal/CMD dan pastikan sudah berada di dalam project-nya.

```bash
npx prisma migrate dev --name user
```
Jika perintah di atas dijalankan, maka akan membuatkan kita file migration di dalam folder prisma/migrations/2025xxxxxx_user/migration.sql

> nama folder migration akan random sesuai tanggal pembuatannya.

<gambar>

Dan database beserta schema table kita juga akan digenerate di dalam MySQL, silahkan teman-teman bisa melihatnya, kurang lebih seperti berikut ini.

    
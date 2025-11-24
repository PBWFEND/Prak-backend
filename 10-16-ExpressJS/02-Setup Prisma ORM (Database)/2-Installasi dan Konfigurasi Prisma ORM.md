# Installasi dan Konfigurasi Prisma ORM

Setelah berkenalan dengan `Prisma`, maka sekarang kita akan belajar bagaimana cara menginstall dan mengkonfigurasi di dalam project Express yang kita miliki.

## Langkah 1 - Installasi Prisma ORM

Silahkan teman-teman masuk ke dalam folder project-nya, kemudian jalankan perintah berikut ini di dalam terminal/CMD.

```bash
npm install prisma --save-dev
```
```bash
// Output

added 33 packages, and audited 115 packages in 36s

22 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Setelah perintah di atas dijalankan, maka `Prisma` akan terinstall di dalam folder `node_modules` dan akan tertera sebagai `devDependencies` di dalam file `package.json`.

```json
 "devDependencies": {
    "prisma": "^6.19.0"
  }
```

## Langkah 2 - Setup Prisma ORM
Setelah proses installasi selesai, sekarang silahkan teman-teman jalankan perintah berikut ini.

```bash
npx prisma init
```
```bash
// Output

yysofiyan @ Midnight: ~/Desktop/untitled folder 3/express/backend-express                      
$ npx prisma init
Fetching latest updates for this subcommand...

✔ Your Prisma schema was created at prisma/schema.prisma
✔ Your Prisma config was created at prisma.config.ts
  You can now open them in your favorite editor.

Environment variables declared in the `.env` file are NOT automatically loaded by Prisma.
See: https://pris.ly/prisma-config-env-vars.

Next steps:
1. Install `dotenv`, and add `import "dotenv/config";` to your `prisma.config.ts` file to load environment variables from `.env`.
2. Run prisma dev to start a local Prisma Postgres server.
3. Define models in the schema.prisma file.
4. Run prisma migrate dev to migrate your local Prisma Postgres database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and a managed serverless Postgres database. Read: https://pris.ly/cli/beyond-orm

More information in our documentation:
https://pris.ly/d/getting-started
```
Jika perintah di atas berhasil dijalankan, maka kita akan mendapatkan 2 hal, yaitu:

1. Membuat folder baru bernama `prisma` yang berisi file bernama `schema.prisma`, dimana di dalam file tersebut akan berisi skema Prisma dengan variabel koneksi database dan model schema yang nanti digunakan untuk membuat table.
2. Membuat file `.env` di di dalam root project, yang digunakan untuk mendefinisikan _environment variabel_ (seperti koneksi database).
3. Membuat file `prisma.config.ts` di di dalam root project, yang digunakan untuk mendefinisikan konfigurasi Prisma.


![prisma](https://i.ibb.co.com/bMP6pJpW/Screenshot-2025-11-16-at-13-20-14.png)


## Langkah 3 - Konfigurasi Koneksi Database

Secara default Prisma akan menggunakan driver database `Postgre`, maka kita akan mengubahnya menjadi `MySql`. Silahkan teman-teman buka file `.env`, kemudian ubah kode-nya menjadi seperti berikut ini.

```env
DATABASE_URL="mysql://root:@localhost:3306/db_express"
```
Penjelasan:
- `DATABASE_URL` adalah variabel yang digunakan untuk mendefinisikan koneksi database.
- `mysql` adalah driver database yang digunakan.
- `root` adalah username yang digunakan untuk koneksi database.
- `root` adalah password yang digunakan untuk koneksi database.
- `localhost` adalah host yang digunakan untuk koneksi database.
- `3306` adalah port yang digunakan untuk koneksi database.
- `db_express` adalah nama database yang digunakan.

> Catatan: Silahkan sesuaikan dengan konfigurasi MySQL masing-masing

# Membuat Project Express

Setelah Node.js berhasil terinstall di dalam komputer, tentu sekarang kita sudah bisa memulai membuat sebuah project baru dengan Express.

## Langkah 1 - Membuat Project Express

Silahkan masuk ke dalam folder dimana teman-teman menyimpan project-nya, kemudian jalankan perintah berikut ini di dalam terminal/CMD:

    ```bash
    mkdir backend-express
    ```
Perintah `mkdir` di atas digunakan untuk membuat sebuah direktori/folder baru dengan nama `backend-express`. Atau teman-teman juga bisa membuat folder-nya secara manual.

Setelah folder berhasil terbuat, sekarang kita akan masuk ke dalam folder tersebut menggunakan perintah berikut:

```bash
    cd backend-express
```

Jika sudah berada di dalam folder `backend-express`, maka sekarang kita akan lanjutkan untuk membuat project Express baru. Silahkan jalankan perintah berikut di dalam terminal/CMD:

```bash
    npm init
```

Ketika kita menjalankan perintah di atas, maka kita akan mendapatkan beberapa pertanyaan. Silahkan ikuti langkah-langkahnya seperti berikut:

| PERTANYAAN | AKSI |
|------------|------|
| package name | Silahkan ENTER, karena kita akan gunakan default package name sesuai dengan nama folder kita |
| version | Silahkan ENTER, atau bisa memberikan versi-nya terlebih dahulu |
| description | Silahkan ENTER, atau bisa memberikan deskripsi project-nya terlebih dahulu |
| entry point | Secara default nama main file project kita adalah `index.js`, ini bisa disesuaikan atau dibiarkan default. Setelah itu, silahkan ENTER |
| test command | Silahkan ENTER |
| git repository | Silahkan ENTER |
| keywords | Silahkan ENTER |
| author | Silahkan ENTER, atau bisa disesuaikan terlebih dahulu |
| license | Silahkan ENTER |

Contoh output `package.json` yang dihasilkan:
```json
{
  "name": "backend-express",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "yysofiyan",
  "license": "ISC",
  "description": ""
}
```
Kemudian ada pertanyaan lagi "Is this OK? (yes)". Silahkan ENTER. Jika berhasil maka kita akan mendapatkan 1 file baru dengan nama `package.json`.

Sekarang, kita lanjutkan untuk melakukan instalasi Express. Silahkan jalankan perintah berikut di dalam terminal/CMD dan pastikan berada di dalam folder `backend-express`:

    ```bash
    npm install express --save
    ```

Jika perintah di atas berhasil dijalankan, maka kita akan mendapatkan 1 folder baru dengan nama `node_modules` yang berisi dependensi dari Node.js dan Express.

Dan jika kita lihat di dalam file `package.json` di bagian dependencies, maka kita menemukan kurang lebih seperti berikut:

```json
{
  "dependencies": {
    "express": "^5.1.0"
  }
}
```
Artinya Express sudah berhasil ditambahkan.

## Langkah 2 - Membuat File Main Express

Sekarang kita akan menambahkan main file dari Express dan menambahkan 1 route untuk mencobanya di dalam web browser. Silahkan buat file baru dengan nama `index.js` dan masukkan kode berikut:

```javascript
// Import express
const express = require('express');

// Init app
const app = express();

// Define port
const port = 3000;

// Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
```

**Penjelasan Kode:**

1. **Import express**: Membuat variabel `express` yang berisi import module Express
2. **Init app**: Membuat variabel `app` yang berisi inisialisasi Express
3. **Define port**: Membuat variabel `port` dengan nilai 3000 (bisa disesuaikan)
4. **Route**: Membuat route baru dengan method GET yang mengembalikan 'Hello World!'
5. **Start server**: Menjalankan Express pada port yang telah ditentukan dan menampilkan log

## Langkah 3 - Instalasi Nodemon

Disini kita akan menginstall Nodemon di dalam komputer secara global. Nodemon akan digunakan untuk menjalankan project Express kita, dimana jika terjadi perubahan di dalam kode project kita tidak perlu melakukan restart server secara manual, karena Nodemon akan melakukannya secara otomatis.

Silahkan jalankan perintah berikut di dalam terminal/CMD:

```bash
    npm install -g nodemon
```
```bash
// output
yysofiyan @ Midnight: ~/Desktop/untitled folder 3/express/backend-express                      
$ npm install -g  nodemon

added 29 packages in 6s

4 packages are looking for funding
  run `npm fund` for details
```
Jika mendapatkan error terkait permission, maka silahkan tambahkan `sudo` di awal perintah instalasi (Linux/Mac) atau buka CMD sebagai Administrator (Windows).

## Langkah 4 - Menjalankan Project Express

```bash
    nodemon index.js
```
```bash
// output
yysofiyan @ Midnight: ~/Desktop/untitled folder 3/express/backend-express                      
$ nodemon index.js
[nodemon] 3.1.11
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node index.js`
Server started on port 3000
```
Jika muncul tulisan "`Server started on port 3000`", artinya project Express kita telah berhasil dijalankan. Kita bisa melihatnya di dalam web browser di [http://localhost:3000](http://localhost:3000).


# Panduan Penggunaan

Proyek ini berisi materi dan contoh praktikum **Pemrograman Web Back End** menggunakan JavaScript dan Node.js. Program pada pertemuan awal menggunakan `module bawaan Node.js`, sehingga belum membutuhkan `Express.js` atau package tambahan.

## Persiapan

Sebelum menjalankan program, siapkan:

- Node.js versi 20 atau lebih baru
- Visual Studio Code atau editor kode lain
- Terminal atau Command Prompt

Node.js adalah runtime yang digunakan untuk menjalankan JavaScript di luar browser. `npm` ikut terpasang bersama Node.js dan akan digunakan pada pertemuan berikutnya saat membutuhkan package tambahan.

Unduh Node.js dari [nodejs.org](https://nodejs.org/en/download/). Pilih versi LTS agar lebih stabil untuk kegiatan praktikum.

Setelah instalasi selesai, periksa versi Node.js dan npm:

```bash
node --version
npm --version
```

Jika perintah tersebut menampilkan nomor versi, Node.js sudah siap digunakan. Pada Windows, buka kembali terminal setelah instalasi jika perintah belum dikenali.

## Membuka Folder Proyek

Buka terminal pada folder `Prak-backend`:

```bash
cd /path/ke/Materi/Prak-backend
```

Ganti `/path/ke/Materi` sesuai lokasi folder pada komputer masing-masing. Di VS Code, folder proyek juga dapat dibuka melalui menu **File > Open Folder**.

Kode praktikum Pertemuan 1 berada pada folder berikut:

```text
code/pertemuan-01/
```

## Menjalankan Program

Semua contoh dapat dijalankan langsung tanpa proses kompilasi. Jalankan perintah dari root proyek dengan path file yang lengkap.

### Demo server HTTP

```bash
node code/pertemuan-01/server.js
```

Buka alamat berikut pada browser:

```text
http://localhost:3000/
http://localhost:3000/mahasiswa
http://localhost:3000/tidak-ada
```

### Latihan mahasiswa

```bash
node code/pertemuan-01/latihan.js
```

Server latihan menggunakan port `3001`:

```text
http://localhost:3001/about
http://localhost:3001/mahasiswa
```

### API perpustakaan

```bash
node code/pertemuan-01/perpustakaan.js
```

API perpustakaan menggunakan port `3002` dan dapat diakses melalui:

```text
http://localhost:3002/buku
http://localhost:3002/peminjaman
```

Tekan `Ctrl+C` pada terminal untuk menghentikan server.

> Alternatif: masuk lebih dulu ke folder kode, lalu jalankan nama file secara langsung.
>
> ```bash
> cd code/pertemuan-01
> node server.js
> ```

## Menguji Endpoint

Request `GET` dapat diuji melalui browser. Untuk request `POST`, gunakan terminal dengan `curl`.

Contoh menambah mahasiswa pada server latihan:

```bash
curl -X POST http://localhost:3001/mahasiswa \
	-H "Content-Type: application/json" \
	-d '{"nim":"F1D022099","nama":"Nama Anda"}'
```

Contoh request pada API perpustakaan:

```bash
curl http://localhost:3002/buku

curl -X POST http://localhost:3002/buku/1/peminjaman

curl -X PATCH http://localhost:3002/peminjaman/1/pengembalian
```

Pada Windows, perintah `curl` dapat dijalankan melalui PowerShell. Jika penulisan beberapa baris menggunakan karakter `\` tidak bekerja, tulis seluruh perintah dalam satu baris.

## Menjalankan dari VS Code

1. Buka folder `Prak-backend` di VS Code.
2. Buka file yang ingin dijalankan, misalnya `code/pertemuan-01/server.js`.
3. Buka terminal melalui menu **Terminal > New Terminal**.
4. Pastikan terminal berada pada folder `Prak-backend`.
5. Jalankan perintah Node.js sesuai contoh di atas.

Ekstensi yang disarankan:

- [JavaScript and TypeScript Language Features](https://code.visualstudio.com/docs/languages/javascript)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), jika digunakan pada materi atau proyek berikutnya

## Mengatasi Error Umum

### `Cannot find module`

Biasanya file dijalankan dari folder yang salah. Pastikan lokasi file benar, lalu gunakan salah satu cara berikut:

```bash
cd /path/ke/Materi/Prak-backend/code/pertemuan-01
node latihan.js
```

atau:

```bash
cd /path/ke/Materi/Prak-backend
node code/pertemuan-01/latihan.js
```

### `EADDRINUSE: address already in use`

Artinya port yang diperlukan sedang digunakan oleh server lain. Hentikan server lama dengan `Ctrl+C`, kemudian jalankan kembali program.

Jika terminal lama sudah tertutup, cari proses yang menggunakan port tersebut. Contoh pada macOS dan Linux:

```bash
lsof -i :3001
```

Gunakan port yang sesuai dengan program: `3000` untuk `server.js`, `3001` untuk `latihan.js`, dan `3002` untuk `perpustakaan.js`.

### `node: command not found`

Node.js belum terpasang atau belum masuk ke PATH. Instal Node.js versi LTS dari [nodejs.org](https://nodejs.org/en/download/), lalu tutup dan buka kembali terminal.

### Response `404`

Periksa method dan URL yang digunakan. Contohnya, `GET /mahasiswa` berbeda dengan `POST /mahasiswa`, dan setiap program menggunakan port yang berbeda.

## Catatan Penting

- Data pada contoh disimpan di memori dan akan kembali ke data awal ketika server dihentikan.
- Jangan menjalankan dua program pada port yang sama.
- Perhatikan huruf besar dan kecil pada nama file, URL, method HTTP, dan field JSON.
- Biarkan server tetap berjalan pada satu terminal, lalu gunakan terminal atau browser lain untuk mengirim request.

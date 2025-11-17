
# **Modul Praktikum 7: Asynchronous JavaScript**

## **Topik:** `Callback`, `Promise`, dan `Async`/`Await`

### **A. Tujuan Pembelajaran**

Setelah menyelesaikan modul ini, mahasiswa diharapkan mampu:

1.  Menjelaskan **mengapa** *asynchronous programming* dibutuhkan dalam JavaScript (konsep *single-thread* dan *blocking*).
2.  Memahami evolusi async: dari **Callback** ke **Promise** (`.then`, `.catch`).
3.  Menggunakan sintaks modern **`async/await`** untuk menulis kode asinkron yang bersih dan mudah dibaca.
4.  Menangani error dalam proses asinkron menggunakan `try...catch`.
5.  Mengambil data dari API eksternal (fetch data dummy) menggunakan `async/await` (Praktikum).

### **B. Alat dan Bahan**

1.  Komputer/Laptop dengan **Node.js (versi 18 atau lebih baru)** dan Visual Studio Code.
2.  Koneksi internet (untuk mengambil data dari API).
3.  Folder proyek baru: `praktikum-7`.

> **Penting:** Praktikum ini menggunakan `fetch()`, yang sudah tersedia secara global di Node.js versi 18 ke atas. Pastikan Node.js Anda sudah di-update.

### **C. Dasar Teori**

#### **1. Masalah: Synchronous (Blocking)**

JavaScript pada dasarnya adalah bahasa *single-threaded*. Artinya, ia hanya bisa melakukan **satu hal pada satu waktu**.

Bayangkan seorang koki yang *synchronous*:

1.  Dia merebus air (menunggu 5 menit, tidak melakukan apa-apa).
2.  Setelah air mendidih, dia memotong sayuran (2 menit).
3.  Selesai.

Selama 5 menit menunggu air, sang koki "ter-blokir" dan tidak bisa melakukan hal lain. Ini tidak efisien.

#### **2. Solusi: Asynchronous (Non-Blocking)**

Seorang koki *asynchronous*: 👨‍🍳

1.  Dia menyalakan kompor untuk merebus air.
2.  **Sambil menunggu air mendidih**, dia langsung memotong sayuran.
3.  Ketika air sudah mendidih, dia akan "diberi tahu" (misal, kompor berbunyi) dan melanjutkan proses merebus.

Inilah cara kerja *asynchronous* JS. Kita "mendelegasikan" tugas yang lambat (seperti mengambil data dari internet atau membaca file) ke *background* dan melanjutkan eksekusi kode lain.

#### **3. Evolusi Asynchronous di JS**

  * **a. Callbacks (Cara Lama):**
    Sebuah fungsi yang "diberikan" sebagai argumen ke fungsi lain, untuk dipanggil nanti ketika tugasnya selesai.

      * **Masalah:** Jika banyak tugas berurutan, ini akan menciptakan "Callback Hell" atau "Pyramid of Doom"—kode yang menjorok ke dalam dan sangat sulit dibaca.

  * **b. Promises (Cara Modern - ES6):**
    Sebuah *object* yang merepresentasikan hasil dari operasi asinkron (yang mungkin belum selesai). Sebuah Promise memiliki 3 status:

    1.  `pending`: Sedang menunggu.
    2.  `fulfilled`: Berhasil (mendapat data).
    3.  `rejected`: Gagal (mendapat error).

    Kita tidak lagi "memberi callback", tapi kita "memasang" *event listener* pada object Promise menggunakan `.then()` (jika berhasil) dan `.catch()` (jika gagal). Ini jauh lebih rapi.

  * **c. Async/Await (Sintaks Terbaik - ES2017):**
    Ini adalah "syntactic sugar" (cara penulisan yang lebih manis) di atas Promises. Ini membuat kode *asynchronous* kita terlihat seperti kode *synchronous*, sehingga sangat mudah dibaca.

      * `async`: Diletakkan di depan deklarasi fungsi. Ini memberitahu JS bahwa fungsi tersebut akan mengembalikan sebuah Promise.
      * `await`: Diletakkan di depan operasi yang mengembalikan Promise (seperti `fetch()`). Ini "menjeda" eksekusi fungsi *di baris itu* sampai Promise tersebut `fulfilled` atau `rejected`, tanpa memblokir seluruh program.
      * `try...catch`: Kita menggunakan ini untuk menangani error (jika Promise-nya `rejected`).

-----

### **D. Tugas/Praktikum: Fetch Data Dummy dengan Async/Await**

**Tujuan:** Mengambil data profil seorang pengguna dari API dummy [JSONPlaceholder](https://jsonplaceholder.typicode.com)

#### **Langkah 1: Siapkan File**

1.  Buat folder baru bernama `praktikum-7`.
2.  Di dalamnya, buat file `fetch_user.js`.

#### **Langkah 2: Tulis Kode Program**

Salin dan pahami kode di bawah ini. Kode ini mendefinisikan sebuah fungsi `async` untuk mengambil data.

```javascript
// fetch_user.js

// URL dari API (endpoint untuk user dengan ID 1)
const API_URL = 'https://jsonplaceholder.typicode.com/users/1';

/**
 * Fungsi ini mengambil data pengguna dari API menggunakan async/await.
 */
async function ambilDataPengguna() {
  console.log("Mengambil data...");

  try {
    // 1. Await: Menjeda eksekusi sampai 'fetch' selesai
    const response = await fetch(API_URL);

    // 2. Cek apakah request berhasil (HTTP status 200-299)
    if (!response.ok) {
      // Jika server merespons dengan error (misal: 404 Not Found)
      throw new Error(`Gagal mengambil data, status: ${response.status}`);
    }

    // 3. Await: Menjeda eksekusi sampai proses .json() selesai
    // .json() juga asinkron karena perlu membaca dan mem-parsing data
    const data = await response.json();

    // 4. Jika berhasil, tampilkan data yang relevan
    console.log("\n--- Data Pengguna Ditemukan ---");
    console.log(`Nama    : ${data.name}`);
    console.log(`Email   : ${data.email}`);
    console.log(`Alamat  : ${data.address.street}, ${data.address.city}`);
    console.log(`Telepon : ${data.phone}`);

  } catch (error) {
    // 5. Blok catch: Menangkap error jaringan atau error dari 'throw'
    console.error("\nTerjadi Kesalahan!");
    console.error(error.message);
  }
}

// Panggil fungsi async yang sudah kita buat
ambilDataPengguna();

console.log("... Baris ini akan tampil lebih dulu!");
```

#### **Langkah 3: Jalankan dan Analisis Hasil**

1.  Buka terminal di direktori `praktikum-7`.
2.  Jalankan program:
    ```bash
    node fetch_user.js
    ```
3.  Amati outputnya\!

**Output yang Diharapkan:**

```
Mengambil data...
... Baris ini akan tampil lebih dulu!

--- Data Pengguna Ditemukan ---
Nama    : Leanne Graham
Email   : Sincere@april.biz
Alamat  : Kulas Light, Gwenborough
Telepon : 1-770-736-8031 x56442
```

**Analisis:**
Perhatikan bahwa `"Baris ini akan tampil lebih dulu!"` tercetak **sebelum** data pengguna. Ini membuktikan bahwa `await` hanya menjeda fungsi `ambilDataPengguna`, bukan seluruh program. JavaScript melanjutkan eksekusi ke baris `console.log` terakhir sambil menunggu data di-fetch di *background*.

## **Referensi**

1.  [MDN Web Docs - Asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)
2.  [JavaScript.info - Asynchronous JavaScript](https://javascript.info/async)
3.  [JSONPlaceholder](https://jsonplaceholder.typicode.com)
4.  [Asynchronous JavaScript (W3Schools)](https://www.w3schools.com/js/js_async.asp)
7.  [Asynchronous JavaScript (GeeksforGeeks)](https://www.geeksforgeeks.org/asynchronous-javascript/)

# **Modul Praktikum 1: Dasar NodeJS & JavaScript**

**Topik:** Variabel, Tipe Data, dan Method String

-----

## **A. Tujuan Pembelajaran**

Setelah menyelesaikan modul ini, mahasiswa diharapkan mampu:

1.  Memahami dan menjelaskan konsep variabel serta perbedaannya (`var`, `let`, `const`).
2.  Mengenal dan mengidentifikasi berbagai tipe data primitif dalam JavaScript.
3.  Menggunakan *string methods* untuk memanipulasi teks.
4.  Membuat dan menjalankan program NodeJS sederhana untuk menampilkan biodata di terminal.

## **B. Alat dan Bahan**

1.  Komputer/Laptop dengan sistem operasi (Windows, macOS, atau Linux).
2.  **Node.js** terinstal. (Pastikan sudah terinstal dengan menjalankan `node -v` di terminal).
3.  **Visual Studio Code** atau teks editor lainnya.

## **C. Dasar Teori**

JavaScript adalah bahasa pemrograman yang menjadi fondasi pengembangan web modern. NodeJS memungkinkan kita menjalankan JavaScript di sisi server (*backend*), bukan hanya di browser.

## **1. Variabel**

Variabel adalah "wadah" untuk menyimpan nilai atau data. Di JavaScript modern, ada tiga cara untuk mendeklarasikan variabel:

  * `let`: Digunakan untuk variabel yang nilainya bisa berubah. Ini adalah cara yang paling umum digunakan saat ini.
    ```javascript
    let umur = 20;
    umur = 21; // Nilainya bisa diubah
    ```
  * `const`: Digunakan untuk variabel yang nilainya tetap dan tidak akan pernah berubah (*konstanta*).
    ```javascript
    const tempatLahir = "Jakarta";
    // tempatLahir = "Bandung"; // Ini akan menghasilkan error
    ```
  * `var`: Cara lama untuk mendeklarasikan variabel. Sebaiknya dihindari dalam kode modern karena memiliki cakupan (*scope*) yang bisa membingungkan.

## **2. Tipe Data**

Tipe data adalah jenis nilai yang dapat disimpan dalam variabel. Tipe data dasar (primitif) di JavaScript antara lain:

  * **String**: Teks atau kumpulan karakter, selalu diapit oleh tanda kutip (`'` atau `"`). Contoh: `'Andi'`, `"Belajar JavaScript"`.
  * **Number**: Angka, baik itu bilangan bulat maupun desimal. Contoh: `25`, `3.14`.
  * **Boolean**: Nilai logika yang hanya memiliki dua kemungkinan: `true` atau `false`.
  * **Null**: Mewakili ketiadaan nilai yang disengaja.
  * **Undefined**: Mewakili variabel yang telah dideklarasikan tetapi belum diberi nilai.

## **3. String Methods**

String memiliki fungsi bawaan (*methods*) yang sangat berguna untuk memanipulasi teks. Beberapa yang sering digunakan:

  * `.length`: Mengembalikan jumlah karakter dalam string.
  * `.toUpperCase()`: Mengubah semua karakter menjadi huruf besar.
  * `.toLowerCase()`: Mengubah semua karakter menjadi huruf kecil.
  * `.slice(awal, akhir)`: Mengambil sebagian string dari indeks `awal` sampai sebelum indeks `akhir`.
  * `Template Literals`: Cara modern untuk menggabungkan string dan variabel menggunakan backtick (`` ` ``) dan `${variabel}`. Ini lebih mudah dibaca daripada penyambungan dengan tanda `+`.

**Contoh:**

```javascript
let kalimat = "Saya belajar NodeJS";
console.log(kalimat.length); // Output: 18
console.log(kalimat.toUpperCase()); // Output: SAYA BELAJAR NODEJS

let nama = "Budi";
let pesan = `Halo, nama saya ${nama}.`; // Menggunakan Template Literals
console.log(pesan); // Output: Halo, nama saya Budi.
```

-----

## **D. Langkah-Langkah Praktikum**

**Tujuan:** Membuat program sederhana untuk menampilkan biodata diri di konsol menggunakan NodeJS.

#### **Langkah 1: Siapkan Folder Proyek**

1.  Buat sebuah folder baru di komputermu dengan nama `praktikum-1`.
2.  Buka folder tersebut menggunakan Visual Studio Code.

#### **Langkah 2: Buat File JavaScript**

1.  Di dalam VS Code, buat file baru dengan nama `biodata.js`.

#### **Langkah 3: Tulis Kode Program**

1.  Buka file `biodata.js`.
2.  Ketik kode di bawah ini. Ganti nilainya dengan biodata Anda sendiri.

<!-- end list -->

```javascript
// biodata.js

// 1. Deklarasikan variabel menggunakan const dan let
const namaLengkap = "Nama Kamu"; // Ganti dengan nama lengkapmu
const tempatLahir = "Sumedang";
let tanggalLahir = "15 Juli 2004"; // Format bisa disesuaikan
let umur = 21; // Ganti dengan umurmu
let statusMahasiswa = true; // Gunakan boolean (true jika aktif, false jika tidak)

// 2. Gunakan string methods untuk memanipulasi data
const namaBesar = namaLengkap.toUpperCase();
const asalKota = tempatLahir.slice(0, 5); // Mengambil 5 karakter pertama

// 3. Siapkan output menggunakan Template Literals
const biodata = `
=========================================
          BIODATA MAHASISWA
=========================================
Nama Lengkap    : ${namaBesar}
Tempat Lahir    : ${tempatLahir}
Tanggal Lahir   : ${tanggalLahir}
Umur            : ${umur} tahun
Asal Kota (Slice) : ${asalKota}
Status Aktif    : ${statusMahasiswa}
=========================================
`;

// 4. Tampilkan output ke konsol
console.log(biodata);

```

#### **Langkah 4: Jalankan Program**

1.  Buka terminal terintegrasi di VS Code (Caranya: `View` \> `Terminal` atau `Ctrl` + \`\`\`).
2.  Pastikan Anda berada di direktori `praktikum-1`.
3.  Ketik perintah berikut dan tekan Enter:
    ```bash
    node biodata.js
    ```

#### **Langkah 5: Verifikasi Hasil**

Jika berhasil, Anda akan melihat output biodata yang telah diformat muncul di terminal seperti ini:

```
=========================================
          BIODATA MAHASISWA
=========================================
Nama Lengkap    : Nama Kamu
Tempat Lahir    : Sumedang
Tanggal Lahir   : 15 Juli 2004
Umur            : 21 tahun
Asal Kota (Slice) : Sumedang
Status Aktif    : true
=========================================
```

-----

## **E. Latihan Tambahan**

1.  **Modifikasi Program**: Tambahkan variabel baru seperti `jurusan` dan `universitas`. Tampilkan juga di output biodata.
2.  **Eksplorasi Method**: Coba gunakan *string method* lain seperti `.toLowerCase()`, `.replace()`, atau `.trim()` pada variabel yang ada dan tampilkan hasilnya.
3.  **Gabungkan String**: Coba buat variabel `alamat` dengan menggabungkan variabel `jalan` dan `kota` menggunakan operator `+` dan bandingkan kemudahannya dengan *Template Literals*.

-----
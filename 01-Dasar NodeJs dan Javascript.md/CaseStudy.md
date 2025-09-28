# Studi Kasus 1: Sistem Mini Pendaftaran Karyawan

## A. Skenario

Anda adalah seorang Junior Backend Developer di perusahaan "PT. Cipta Solusi Digital". Tim HR meminta Anda untuk membuat sebuah prototipe program `command-line (CLI)` sederhana.

Tujuannya adalah untuk mengolah data mentah calon karyawan dan menghasilkan ringkasan pendaftaran yang terformat dengan baik, lengkap dengan `Employee ID` yang dibuat secara otomatis.

Program ini akan menjadi dasar untuk sistem *HRIS (Human Resource Information System)* yang lebih besar di masa depan.

## B. Tugas Utama

Buatlah sebuah script NodeJS (`register.js`) yang melakukan hal-hal berikut:

1. Menyimpan data mentah karyawan dalam variabel-variabel.

2. Mengolah data nama dan NIK untuk membuat `Employee ID` unik.

3. Memformat nominal gaji agar mudah dibaca.

4. Menampilkan ringkasan pendaftaran karyawan yang rapi dan terstruktur di terminal.

## C. Data Mentah (Input)

Gunakan data berikut di dalam kode Anda:

- Nama Depan: `Nama anda`
- Nama Belakang: `Nama belakang anda`
- NIK: `3204011205990003`
- Posisi: `Backend Developer`
- Gaji Pokok (Gross): `9500000` (tipe data Number)
- Status Karyawan Tetap: `true` (tipe data Boolean)

## D. Spesifikasi Output yang Diinginkan

Program Anda harus menghasilkan output di terminal yang persis seperti format di bawah ini:

```bash
===================================================
        DATA PENDAFTARAN KARYAWAN BARU
===================================================

SELAMAT DATANG DI PT. CIPTA SOLUSI DIGITAL!

Berikut adalah ringkasan data Anda:

  Nama Lengkap      : BRILIAN PRATAMA
  Posisi            : Backend Developer
  Employee ID       : BP0003
  
  Gaji Pokok (Gross): Rp 9.500.000
  Status            : Karyawan Tetap

===================================================
```
**Aturan Pembuatan Employee ID:**

- Ambil huruf pertama dari `Nama Depan.`
- Ambil huruf pertama dari `Nama Belakang`.
- Ambil` 4 digit terakhir` dari NIK. (Contoh: NIK `3204011205990003` akan menjadi `0003`)
- Gabungkan semuanya dan ubah menjadi huruf besar. Contoh: `BP0003`.


## E. Petunjuk Pengerjaan & Solusi

#### Langkah 1: Persiapan File

Buat file baru bernama `register.js` di dalam folder praktikum Anda.

#### Langkah 2: Deklarasi Variabel Data Mentah

Masukkan semua data mentah ke dalam variabel menggunakan `let` atau `const`.

```javascript
// register.js

// --- INPUT DATA ---
const firstName = "Brilian";
const lastName = "Pratama";
const nik = "3204011205990003";
const position = "Backend Developer";
let grossSalary = 9500000;
let isPermanent = true;
```
#### Langkah 3: Proses Pembuatan Employee ID

Gunakan _string methods_ untuk mengekstrak dan menggabungkan data sesuai aturan.

```javascript

// --- PROSES DATA ---

// 1. Ambil inisial nama
const initialFirstName = firstName.slice(0, 1); // Hasil: "B"
const initialLastName = lastName.slice(0, 1);   // Hasil: "P"

// 2. Ambil 4 digit terakhir NIK
const lastNikDigits = nik.slice(-4); // Hasil: "0003"

// 3. Gabungkan semuanya dan ubah ke huruf besar
const employeeID = (initialFirstName + initialLastName + lastNikDigits).toUpperCase(); // Hasil: "BP0003"
```
**Penjelasan**:

- ` .slice(0, 1)` mengambil karakter dari indeks 0 sebanyak 1 karakter.

- `.slice(-4)` adalah cara cepat untuk mengambil 4 karakter dari akhir string.

#### Langkah 4: Memformat Gaji dan Status

Ubah data `Number` dan `Boolean` menjadi `String` yang lebih mudah dibaca.

```javascript
// 4. Format Gaji ke format Rupiah
// toLocaleString('id-ID') adalah cara bawaan JavaScript untuk format angka Indonesia

const formattedSalary = `Rp ${grossSalary.toLocaleString('id-ID')}`; // Hasil: "Rp 9.500.000"

// 5. Ubah boolean menjadi teks yang deskriptif

const statusText = isPermanent ? "Karyawan Tetap" : "Karyawan Kontrak"; // Hasil: "Karyawan Tetap"
// Ini menggunakan operator ternary, versi singkat dari if-else.
```

#### Langkah 5: Membuat dan Menampilkan Output

Gunakan _Template Literals_ untuk menyusun semua data yang sudah diproses menjadi output akhir.

> Template Literals adalah fitur baru di ES6 yang memungkinkan kita untuk menggabungkan string dan variabel dalam satu template.

```javascript
// --- OUTPUT ---

```javascript
const summary = `
===================================================
        DATA PENDAFTARAN KARYAWAN BARU
===================================================

SELAMAT DATANG DI PT. CIPTA SOLUSI DIGITAL!

Berikut adalah ringkasan data Anda:

  Nama Lengkap      : ${(firstName + " " + lastName).toUpperCase()}
  Posisi            : ${position}
  Employee ID       : ${employeeID}
  
  Gaji Pokok (Gross): ${formattedSalary}
  Status            : ${statusText}

===================================================
`;

console.log(summary);
```
Jalankan kode di terminal dengan perintah: `node register.js`


### F . Tantangan Ekstra (Opsional)

Untuk lebih melatih pemahaman Anda, coba lakukan modifikasi berikut:

1. **Validasi NIK**: Tambahkan sebuah `console.log` di bagian atas yang memberitahu apakah panjang NIK valid (harus 16 digit). `Contoh: console.log("Panjang NIK Valid:", nik.length === 16);`

2. **Generate Email:** Buat variabel baru bernama `emailPerusahaan`. Formatnya adalah `namadepan.namabelakang@ciptasolusi.digital` (semua huruf kecil). Tampilkan juga di ringkasan data. Contoh: `const emailPerusahaan = (firstName.toLowerCase() + "." + lastName.toLowerCase() + "@ciptasolusi.digital");`

### G. Kesimpulan

Program ini dirancang untuk memberikan pemahaman dasar tentang penggunaan *variabel*, *tipe data*, dan *method string* dalam JavaScript. Dengan mengikuti studi kasus ini, kita belajar bagaimana mengolah data sederhana seperti nama, NIK, dan gaji untuk menghasilkan informasi yang terstruktur dan mudah dibaca. 

Konsep-konsep seperti manipulasi string, pengkondisian, dan formatting output merupakan fondasi penting dalam pengembangan aplikasi backend.

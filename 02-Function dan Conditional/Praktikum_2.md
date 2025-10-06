
# **Modul Praktikum 2: Function & Conditional Logic**

**Topik:** `Function`, `If-Else`, dan `Switch-Case`

-----

## **A. Tujuan Pembelajaran**

Setelah menyelesaikan modul ini, mahasiswa diharapkan mampu:

1.  Memahami konsep dan kegunaan *function* untuk membuat kode yang dapat digunakan kembali (*reusable*).
2.  Menulis dan memanggil *function* dengan parameter dan nilai kembalian (*return value*).
3.  Menerapkan logika percabangan menggunakan `if`, `else if`, dan `else`.
4.  Menggunakan `switch-case` sebagai alternatif untuk percabangan yang lebih spesifik.
5.  Membangun program sederhana yang mengandung logika bisnis dasar.

## **B. Alat dan Bahan**

1.  Komputer/Laptop dengan Node.js dan Visual Studio Code yang sudah terinstal.
2.  Folder proyek `praktikum-2` (dianjurkan membuat folder baru untuk setiap modul).

## **C. Dasar Teori**

Setelah mampu menyimpan data dalam variabel, langkah selanjutnya adalah mengolah data tersebut. Di sinilah *function* dan *conditional logic* memegang peranan kunci dalam logika *backend*.

#### **1. Function**

**Fungsi** adalah blok kode yang dirancang untuk melakukan tugas tertentu dan dapat dipanggil berulang kali. Ini membantu kita menghindari penulisan kode yang sama berulang-ulang (*Don't Repeat Yourself* / DRY).

  * **Deklarasi Fungsi**: Cara mendefinisikan sebuah fungsi.
    ```javascript
    function sapaPengguna(nama) { // 'nama' adalah parameter
      return `Halo, selamat datang ${nama}!`;
    }
    ```
  * **Memanggil Fungsi**: Menggunakan fungsi yang telah dibuat.
    ```javascript
    let pesanSalam = sapaPengguna("Andi"); // "Andi" adalah argumen
    console.log(pesanSalam); // Output: Halo, selamat datang Andi!
    ```
  * **Parameter & Return**: **Parameter** adalah variabel input untuk fungsi, sedangkan `return` adalah kata kunci untuk memberikan nilai output dari fungsi. Sebuah fungsi tidak harus memiliki parameter atau `return`.

#### **2. Conditional Logic (Logika Percabangan)**

Conditional memungkinkan program untuk mengambil keputusan dan menjalankan blok kode yang berbeda berdasarkan kondisi tertentu.

  * **`if-else`**: Struktur paling umum untuk percabangan. Logikanya seperti "Jika kondisi A terpenuhi, lakukan X. Jika tidak, lakukan Y."

      * `if`: Blok kode yang dieksekusi jika kondisi bernilai `true`.
      * `else if`: Memeriksa kondisi lain jika kondisi `if` sebelumnya `false`.
      * `else`: Blok kode yang dieksekusi jika semua kondisi sebelumnya `false`.

    **Contoh:**

    ```javascript
    let nilai = 85;
    if (nilai > 90) {
      console.log("Nilai Anda A");
    } else if (nilai > 80) {
      console.log("Nilai Anda B"); // Ini yang akan dieksekusi
    } else {
      console.log("Nilai Anda C");
    }
    ```

  * **`switch-case`**: Pilihan yang baik sebagai pengganti `if-else if-else` yang panjang, terutama saat memeriksa satu variabel terhadap banyak kemungkinan nilai.

    **Contoh:**

    ```javascript
    let hari = "Senin";
    switch (hari) {
      case "Senin":
        console.log("Hari ini mulai bekerja!");
        break; // 'break' penting agar tidak melanjutkan ke case berikutnya
      case "Sabtu":
      case "Minggu":
        console.log("Hari ini libur!");
        break;
      default:
        console.log("Hari biasa.");
    }
    ```

  * **Operator Perbandingan**: Untuk membuat kondisi, kita butuh operator seperti:

      * `===` (sama dengan nilai DAN tipe datanya) -\> **Sangat disarankan**
      * `!==` (tidak sama dengan nilai DAN tipe datanya)
      * `>` (lebih besar dari), `<` (lebih kecil dari)
      * `>=` (lebih besar atau sama dengan), `<=` (lebih kecil atau sama dengan)

-----

## **D. Langkah-Langkah Praktikum**

**Tujuan:** Membuat program untuk menentukan grade kelulusan mahasiswa berdasarkan nilai yang diinput.

#### **Langkah 1: Siapkan File**

1.  Buat folder baru bernama `praktikum-2`.
2.  Di dalam folder tersebut, buat file baru dengan nama `grade_mahasiswa.js`.

#### **Langkah 2: Tulis Kode Program**

1.  Buka file `grade_mahasiswa.js`.
2.  Ketik kode di bawah ini. Kode ini berisi sebuah fungsi untuk menentukan grade dan beberapa contoh pemanggilannya.

<!-- end list -->

```javascript
// grade_mahasiswa.js

/**
 * Fungsi ini menerima skor numerik dan mengembalikan grade huruf.
 * @param {number} skor - Nilai mahasiswa (0-100).
 * @returns {string} - Grade (A, B, C, D, atau E).
 */
function tentukanGrade(skor) {
  if (skor >= 90 && skor <= 100) {
    return "A (Luar Biasa)";
  } else if (skor >= 80 && skor < 90) {
    return "B (Baik)";
  } else if (skor >= 70 && skor < 80) {
    return "C (Cukup)";
  } else if (skor >= 60 && skor < 70) {
    return "D (Kurang)";
  } else if (skor >= 0 && skor < 60) {
    return "E (Gagal)";
  } else {
    return "Skor tidak valid"; // Kondisi jika skor di luar rentang 0-100
  }
}

// --- Uji Coba Fungsi ---

// 1. Deklarasikan variabel untuk diuji
let nilaiAndi = 95;
let nilaiBudi = 78;
let nilaiCaca = 55;
let nilaiDeni = 105; // Contoh skor tidak valid

// 2. Panggil fungsi dan simpan hasilnya
let gradeAndi = tentukanGrade(nilaiAndi);
let gradeBudi = tentukanGrade(nilaiBudi);
let gradeCaca = tentukanGrade(nilaiCaca);
let gradeDeni = tentukanGrade(nilaiDeni);

// 3. Tampilkan hasilnya ke konsol dengan rapi
console.log("--- Laporan Grade Mahasiswa ---");
console.log(`Mahasiswa Andi (Nilai: ${nilaiAndi}) mendapatkan grade: ${gradeAndi}`);
console.log(`Mahasiswa Budi (Nilai: ${nilaiBudi}) mendapatkan grade: ${gradeBudi}`);
console.log(`Mahasiswa Caca (Nilai: ${nilaiCaca}) mendapatkan grade: ${gradeCaca}`);
console.log(`Mahasiswa Deni (Nilai: ${nilaiDeni}) mendapatkan grade: ${gradeDeni}`);
console.log("-------------------------------");

```

#### **Langkah 3: Jalankan dan Analisis Hasil**

1.  Buka terminal di VS Code (`Ctrl` + \`\`\`).
2.  Jalankan program dengan perintah:
    ```bash
    node grade_mahasiswa.js
    ```
3.  Perhatikan output yang muncul. Apakah sesuai dengan logika `if-else` yang Anda tulis?

**Output yang Diharapkan:**

```
--- Laporan Grade Mahasiswa ---
Mahasiswa Andi (Nilai: 95) mendapatkan grade: A (Luar Biasa)
Mahasiswa Budi (Nilai: 78) mendapatkan grade: C (Cukup)
Mahasiswa Caca (Nilai: 55) mendapatkan grade: E (Gagal)
Mahasiswa Deni (Nilai: 105) mendapatkan grade: Skor tidak valid
-------------------------------
```

-----

## **E. Studi Kasus 2: Program Kasir Kafe Sederhana**

#### **Skenario**

Anda diminta membuat program kasir sederhana untuk "Kafe Koding". Program ini harus bisa menghitung total harga pesanan berdasarkan menu yang dipilih dan memberikan diskon jika total pembelian mencapai nominal tertentu.

#### **Tugas**

Buatlah script NodeJS (`kasir.js`) yang memiliki sebuah fungsi `hitungTotalPesanan`.

1.  Fungsi ini menerima dua parameter: `kodeMenu` (string) dan `jumlah` (number).
2.  Gunakan `switch-case` untuk menentukan harga satuan berdasarkan `kodeMenu`:
      * `KOPI`: Rp 25.000
      * `TEH`: Rp 20.000
      * `PIZZA`: Rp 55.000
      * Jika kode tidak ada, harga adalah 0.
3.  Hitung **subtotal** (harga satuan × jumlah).
4.  Gunakan `if-else` untuk logika **diskon**:
      * Jika subtotal di atas Rp 100.000, berikan diskon 15%.
      * Jika subtotal di atas Rp 50.000, berikan diskon 10%.
      * Jika tidak, tidak ada diskon.
5.  Fungsi harus mengembalikan (*return*) sebuah string terformat yang berisi rincian pesanan (nama menu, jumlah, subtotal, diskon, dan total akhir).

**Contoh Output Panggilan Fungsi:**
`hitungTotalPesanan("PIZZA", 2)` akan menghasilkan output seperti:

```
--- Struk Pembelian Kafe Koding ---
Menu Dipesan    : Pizza
Jumlah          : 2
Subtotal        : Rp 110.000
Diskon (15%)    : - Rp 16.500
-----------------------------------
Total Bayar     : Rp 93.500
--- Terima Kasih ---
```
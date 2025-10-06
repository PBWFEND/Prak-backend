
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

## **B. Tools Pendukung**

1.  Komputer/Laptop dengan Node.js dan Visual Studio Code yang sudah terinstal.
2.  Folder proyek `praktikum-2` (dianjurkan membuat folder baru untuk setiap modul).

## **C. Dasar Teori**

Setelah mampu menyimpan data dalam variabel, langkah selanjutnya adalah mengolah data tersebut. 

Di sinilah *function* dan *conditional logic* memegang peranan kunci dalam logika *backend*.

## 1. Apa Itu Function?

Bayangin kamu punya resep mie instan. Setiap kali lapar, kamu tinggal ikutin resep itu. Nah, *function* di coding itu mirip banget: semacam “resep” atau “template” yang bisa dipakai berulang kali buat ngerjain tugas tertentu.

### Kenapa Harus Pakai Function?
- Biar nggak nulis kode yang sama terus-terusan (*Don't Repeat Yourself* alias DRY).
- Bisa dipakai berkali-kali, tinggal panggil aja.
- Bikin kode lebih rapi dan gampang dipahami.

---

## Cara Bikin Function

```javascript
function sapaPengguna(nama) {
  return `Halo, selamat datang ${nama}!`;
}
```

Penjelasan:

- `function` = kata kunci buat bikin function.
- `sapaPengguna` = nama function-nya (bebas, asal jelas).
- `(nama)` = parameter, kayak input yang kita masukin.
- `return` = hasil yang dikasih balik sama function.

---

## Cara Pakai Function

```javascript
let pesanSalam = sapaPengguna("Andi");
console.log(pesanSalam); // Output: Halo, selamat datang Andi!
```

Penjelasan:

- `"Andi"` = argumen, nilai yang dikirim ke parameter `nama`.
- `console.log` = buat nampilin hasilnya di layar.

---

## Parameter vs Return

| Istilah     | Penjelasan |
|-------------|-------------------------|
| Parameter   | Input yang kamu masukin ke function, kayak nama, angka, dll. |
| Return      | Output yang dikasih balik sama function, bisa ditampung atau ditampilkan. |

---

## Analogi Simpel

Bayangin kamu bikin function `buatMie(instan)`:
- Parameter = jenis mie yang kamu pilih (Indomie, Mie Sedaap, dll).
- Return = mie yang udah jadi dan siap dimakan 🍜.


## 2. Apa Itu Conditional Logic?

Bayangin kamu lagi main game RPG. Kalau HP kamu di atas 80%, kamu bisa serang musuh. Kalau di bawah itu, kamu harus healing dulu. Nah, keputusan kayak gitu dalam coding disebut *logika percabangan*.

Dengan conditional, program bisa:

- Mengecek kondisi tertentu
- Menjalankan aksi yang berbeda tergantung hasil pengecekan


## `if-else:` Logika Percabangan Paling Basic

```javascript
let nilai = 85;

if (nilai > 90) {
  console.log("Nilai Anda A");
} else if (nilai > 80) {
  console.log("Nilai Anda B"); // Ini yang jalan
} else {
  console.log("Nilai Anda C");
}
```

Penjelasan:

- `if` = kalau kondisi benar, jalankan ini.
- `else if` = kalau kondisi pertama salah, cek kondisi lain.
- `else` = kalau semua kondisi salah, jalankan ini.

Analogi:

> Kalau kamu dapet 90+ di game, dapet rank S. Kalau 80+, rank A. Sisanya rank B.

## switch-case: Buat Banyak Pilihan

```javascript
let hari = "Senin";

switch (hari) {
  case "Senin":
    console.log("Hari ini mulai bekerja!");
    break;
  case "Sabtu":
  case "Minggu":
    console.log("Hari ini libur!");
    break;
  default:
    console.log("Hari biasa.");
}
```

Penjelasan:

- `switch` = kayak menu pilihan.
- `case` = tiap pilihan punya aksi sendiri.
- `break` = biar nggak lanjut ke pilihan lain.
- `default` = kalau nggak ada yang cocok.

Analogi:

> Kamu pilih karakter: "Mage", "Warrior", atau "Healer". Setiap pilihan punya skill unik.

---

## Operator Perbandingan

| Operator | Artinya | Contoh |
|---------|--------|--------|
| `===`   | Sama persis (nilai & tipe data) | `"5" === 5` → ❌ |
| `!==`   | Tidak sama persis | `"5" !== 5` → ✅ |
| `>`     | Lebih besar dari | `10 > 5` → ✅ |
| `<`     | Lebih kecil dari | `3 < 7` → ✅ |
| `>=`    | Lebih besar atau sama | `5 >= 5` → ✅ |
| `<=`    | Lebih kecil atau sama | `4 <= 6` → ✅ |

Tips :

> Selalu pakai `===` biar nggak kena jebakan tipe data yang beda!


# D. Langkah-Langkah Praktikum

**Tujuan:** Membuat program untuk menentukan grade kelulusan mahasiswa berdasarkan nilai yang diinput.

## **Langkah 1: Siapkan File**

1.  Buat folder baru bernama `praktikum-2`.
2.  Di dalam folder tersebut, buat file baru dengan nama `grade_mahasiswa.js`.

## **Langkah 2: Tulis Kode Program**

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

## **Langkah 3: Jalankan dan Analisis Hasil**

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

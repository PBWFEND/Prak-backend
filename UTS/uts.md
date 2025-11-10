# Soal UTS

Setiap soal akan berhubungan langsung dengan konsep yang sudah kita bahas di dalam latihan modul `praktikum 1–5`.

---

## **Rangkuman Materi Modul 1–5**

### **Modul 1 – Dasar NodeJS & JavaScript**

* **Fokus utama:** Cara kerja NodeJS dan sintaks dasar JavaScript.
* **Variabel:**

  * `const` = nilai tetap
  * `let` = nilai bisa berubah
  * `var` = tidak disarankan lagi
* **Tipe data dasar:** `String`, `Number`, `Boolean`
* **String Method penting:** `.length`, `.toUpperCase()`, `.slice()`
* **Gunakan `console.log()` untuk menampilkan output**

---

### **Modul 2 – Function & Conditional**

* **Function:** Tempat menulis logika agar bisa dipakai berulang.

  ```js
  function sapa(nama) {
    return `Halo, ${nama}!`;
  }
  ```
* **Percabangan:** Mengatur alur logika dengan `if`, `else if`, `else`, atau `switch`.
* **Tujuan:** Fungsi membuat kode jadi rapi dan mudah dibaca.

---

### **Modul 3 – Looping & Array**

* **Array:** Kumpulan data dalam satu variabel → `['apel', 'jeruk']`
* **Looping:** Menjalankan perintah berulang → `for`, `forEach()`
* **Array Methods Modern:**

  * `.forEach()` → Jalankan fungsi untuk setiap item
  * `.map()` → Buat array baru hasil ubahan dari array lama
  * `.filter()` → Buat array baru hanya berisi data yang memenuhi kondisi tertentu

---

### **Modul 4 – Object Literal**

* **Object:** Representasi data nyata (misal mahasiswa, mobil, produk)

  ```js
  const mahasiswa = {
    nama: "Rudi",
    nim: "12345",
    jurusan: "Informatika",
  };
  ```
* **Method:** Fungsi di dalam object (misal `mahasiswa.sapa()`).
* **Keyword `this`:** Digunakan di dalam object untuk mengakses properti lain dari object yang sama.

---

### **Modul 5 – JavaScript Modern (ES6+)**

* **Arrow Function:** Bentuk ringkas dari function biasa.

  ```js
  const tambah = (a, b) => a + b;
  ```
* **Destructuring:** Ambil data dari object/array dengan cepat.
* **Spread Operator (`...`):** Menyalin isi array atau object.
* **Template Literals (`` `Halo ${nama}` ``):** Cara modern menggabungkan string dan variabel.

---

# **Petunjuk Umum UTS**

1. Buat satu file untuk setiap soal → `soal1.js`, `soal2.js`, dst. di dalam folder `uts`.
2. Gunakan **sintaks modern (ES6+)** seperti `const`, `let`, `arrow function`, dan *template literals*.
3. Jalankan program dengan:

   ```bash
   node soal1.js
   ```
4. Tampilkan hasil ke konsol dengan `console.log()` yang jelas.

---

## **Soal 1 – Kalkulator Grade Nilai**

Buat *arrow function* bernama `hitungGrade(nilai)` yang mengembalikan *grade huruf* berdasarkan aturan:

| Nilai  | Grade |
| :----- | :---- |
| 90–100 | A     |
| 80–89  | B     |
| 70–79  | C     |
| 60–69  | D     |
| 0–59   | E     |

Jika nilai di luar rentang 0–100 → tampilkan `"Nilai tidak valid"`.
Cetak hasilnya ke konsol.

**Contoh:**

```js
console.log(hitungGrade(95)); // Output: A
console.log(hitungGrade(77)); // Output: C
console.log(hitungGrade(105)); // Output: Nilai tidak valid
```

---

## **Soal 2 – Pengolahan Data Array**

Diberikan data:

```js
const dataProduk = [
  { id: 1, nama: "Laptop Asus", harga: 12000000, kategori: "Elektronik" },
  { id: 2, nama: "Buku OOP", harga: 100000, kategori: "Buku" },
  { id: 3, nama: "Mouse Logitech", harga: 350000, kategori: "Elektronik" },
  { id: 4, nama: "Novel 'Bumi'", harga: 85000, kategori: "Buku" },
];
```

**Tugas:**

1. Gunakan `.filter()` untuk membuat `produkElektronik` yang hanya berisi produk kategori `"Elektronik"`.
2. Gunakan `.map()` untuk membuat `namaProduk` berisi daftar string dengan format:
   `(ID: [id]) [Nama Produk]`

**Output yang diharapkan:**

```js
[
  { id: 1, nama: "Laptop Asus", ... },
  { id: 3, nama: "Mouse Logitech", ... }
]

[
  "(ID: 1) Laptop Asus",
  "(ID: 2) Buku OOP",
  "(ID: 3) Mouse Logitech",
  "(ID: 4) Novel 'Bumi'"
]
```

---

## **Soal 3 – Object Literal & Methods**

Buat sebuah object `mahasiswa` dengan properti:

* `nama`
* `nim`
* `jurusan`
* `matkul` (array daftar mata kuliah)

**Tambahkan dua method:**

1. `tambahMatkul(namaMatkul)` → menambah mata kuliah baru ke `matkul`
2. `tampilkanInfo()` → menampilkan seluruh data mahasiswa dengan format rapi ke konsol

**Langkah demonstrasi:**

1. Tampilkan `nama` dan `nim`
2. Tambahkan dua mata kuliah baru
3. Tampilkan seluruh informasi dengan `tampilkanInfo()`

---

## **Soal 4 – Destructuring & Map**

Diberikan data gaji:

```js
const dataGaji = [
  { nama: "Andi", divisi: "Finance", gaji: 5000000 },
  { nama: "Budi", divisi: "IT", gaji: 7000000 },
  { nama: "Citra", divisi: "Finance", gaji: 5500000 },
  { nama: "Dewi", divisi: "HR", gaji: 4500000 },
];
```

**Tugas:**
Gunakan `.map()` dengan **destructuring** di parameternya untuk membuat array baru `laporanKaryawan`, berisi object baru dengan format:

```js
{
  karyawan: "NAMA" (huruf besar semua),
  divisi: "Divisi",
  tunjangan: 10% dari gaji
}
```

Cetak hasil `laporanKaryawan` ke konsol.

---

## **Soal 5 – Refactor Kode ke ES6+**

Ubah kode berikut dari gaya lama (ES5) ke gaya modern (ES6+):

```js
// Kode Lama
var data = {
  nama: "Perpustakaan Digital",
  koleksi: ["Buku A", "Buku B"]
};

function tambahKoleksi(item) {
  data.koleksi.push(item);
  console.log("Koleksi berhasil ditambah!");
}

function cekKoleksi(item) {
  var ada = data.koleksi.indexOf(item) !== -1;
  if (ada) {
    console.log("Item '" + item + "' ada di perpustakaan.");
  } else {
    console.log("Item '" + item + "' tidak ditemukan.");
  }
}

tambahKoleksi("Buku C");
cekKoleksi("Buku A");
cekKoleksi("Buku Z");
```

**Panduan Refactor:**

1. Ganti `var` → `const` / `let`
2. Ubah `function` → *arrow function*
3. Gunakan *template literals* (`` `...${}` ``) untuk string

---

💡 **Tips:**

* Fokus pada logika, bukan hafalan.
* Jalankan dan uji tiap soal satu per satu.
* Pastikan hasil output sesuai instruksi.

---

Selamat Mengerjakan!

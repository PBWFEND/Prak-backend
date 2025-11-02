# **Modul Praktikum 6: Object-Oriented Programming (OOP) in JS**

## **Topik:** `Class`, `Constructor`, `Inheritance`, dan `Encapsulation`

-----

### **A. Tujuan Pembelajaran**

Setelah menyelesaikan modul ini, mahasiswa diharapkan mampu:

1.  Memahami paradigma OOP sebagai cara memodelkan entitas dunia nyata.
2.  Menulis **Class** sebagai "cetakan" (*blueprint*) untuk membuat object.
3.  Menggunakan **`constructor`** untuk menginisialisasi properti object saat dibuat.
4.  Menerapkan **Inheritance** (Pewarisan) agar sebuah class dapat mewarisi properti dan method dari class lain.
5.  Memahami konsep dasar **Encapsulation** (Enkapsulasi) untuk melindungi data.

### **B. Alat dan Bahan**

1.  Komputer/Laptop dengan Node.js dan Visual Studio Code.
2.  Folder proyek baru: `praktikum-6`.

### **C. Dasar Teori**

#### **1. Apa itu OOP?**

*Object-Oriented Programming* (OOP) adalah cara berpikir dan menstrukturkan kode dengan memodelkannya seperti objek di dunia nyata. Setiap "objek" memiliki **data (properti)** dan **perilaku (method)**.

Contoh: Objek `Mobil` memiliki properti (warna, brand) dan method (maju, rem).

#### **2. Class vs. Instance (Object)**

  * **Class**: Adalah "cetakan" atau *blueprint*. Ini mendefinisikan properti dan method apa yang akan dimiliki oleh sebuah objek. Didefinisikan dengan kata kunci `class`.
  * **Instance (Object)**: Adalah hasil nyata yang dibuat dari "cetakan" (class). Dibuat menggunakan kata kunci `new`.

<!-- end list -->

```javascript
// Class adalah cetakan
class Kucing {
  // ...definisi
}

// Instance adalah objek nyata dari cetakan
const kucingA = new Kucing();
const kucingB = new Kucing();
```

#### **3. `constructor()`**

`constructor` adalah sebuah method khusus di dalam class yang **otomatis berjalan** setiap kali sebuah *instance* baru dibuat (`new`). Tugasnya adalah untuk "membangun" objek dan mengatur nilai awal propertinya.

```javascript
class Mobil {
  // Constructor berjalan saat 'new Mobil()' dipanggil
  constructor(warnaMobil) {
    this.warna = warnaMobil; // 'this' merujuk ke instance yang sedang dibuat
  }

  klakson() {
    console.log(`Mobil ${this.warna} berbunyi: Biip!`);
  }
}

// "merah" diteruskan sebagai argumen 'warnaMobil' ke constructor
const mobilMerah = new Mobil("Merah");
mobilMerah.klakson(); // Output: Mobil Merah berbunyi: Biip!
```

#### **4. Inheritance (Pewarisan)**

Inheritance memungkinkan sebuah class (disebut *child class*) untuk mewarisi semua properti dan method dari class lain (disebut *parent class*). Ini menggunakan kata kunci `extends`.

  * `extends`: Menandakan class mana yang akan diwarisi.
  * `super()`: Kata kunci khusus di dalam *constructor* anak untuk memanggil *constructor* milik induknya.

<!-- end list -->

```javascript
class Kendaraan { // Parent class
  constructor(roda) {
    this.roda = roda;
  }
  
  berjalan() {
    console.log(`Kendaraan ini berjalan dengan ${this.roda} roda.`);
  }
}

class Motor extends Kendaraan { // Child class
  constructor(tipe) {
    // Panggil constructor parent (Kendaraan)
    // dan tetapkan 'roda' jadi 2
    super(2); 
    this.tipe = tipe;
  }
}

const motorBebek = new Motor("Bebek");
motorBebek.berjalan(); // Method 'berjalan' diwarisi dari Kendaraan
```

#### **5. Encapsulation (Enkapsulasi)**

Enkapsulasi adalah konsep "menyembunyikan" data internal sebuah object agar tidak bisa diakses atau diubah sembarangan dari luar. 

Di JavaScript modern (ES2022+), ini dicapai dengan **Private Fields** menggunakan tanda pagar (`#`).

```javascript
class Rekening {
  // #saldo adalah private field
  #saldo = 0;

  constructor(saldoAwal) {
    this.#saldo = saldoAwal;
  }

  lihatSaldo() {
    console.log(this.#saldo); // Bisa diakses dari DALAM class
  }
}

const rekBCA = new Rekening(50000);
rekBCA.lihatSaldo(); // Output: 50000
// console.log(rekBCA.#saldo); // Ini akan ERROR! (Properti private)
```

-----

### **D. Langkah-Langkah Praktikum**

**Tujuan:** Membuat class `Mahasiswa` sederhana dengan properti dan method perkenalan.

#### **Langkah 1: Siapkan File**

1.  Buat folder baru bernama `praktikum-6`.
2.  Di dalamnya, buat file `mahasiswa.js`.

#### **Langkah 2: Tulis Kode Program**

Salin dan pahami kode di bawah ini. Kode ini mendefinisikan class `Mahasiswa` dan membuat dua instance-nya.

```javascript
// mahasiswa.js

// 1. Mendefinisikan Class (Blueprint)
class Mahasiswa {
  
  // 2. Constructor: Dijalankan saat 'new Mahasiswa(...)' dipanggil
  constructor(nama, nim, jurusan) {
    // 'this' mengacu pada instance yang akan dibuat
    this.nama = nama;
    this.nim = nim;
    this.jurusan = jurusan;
    this.status = "Aktif"; // Properti dengan nilai default
  }

  // 3. Method (Perilaku)
  // Ini adalah method yang diminta: 'perkenalan'
  perkenalan() {
    console.log(
      `Halo, nama saya ${this.nama} (NIM: ${this.nim}), ` +
      `dari jurusan ${this.jurusan}.`
    );
  }

  // Method lain
  belajar() {
    console.log(`${this.nama} sedang belajar materi OOP...`);
  }
}

// --- Menggunakan Class ---

console.log("--- Membuat Objek Mahasiswa ---");

// 4. Membuat Instance (Objek Nyata) dari Class
const mhs1 = new Mahasiswa("Andi Hermawan", "10119001", "Informatika");
const mhs2 = new Mahasiswa("Budi Setiawan", "10229005", "Sistem Informasi");

// 5. Memanggil Properti dan Method dari Objek
console.log(`Nama Mahasiswa 1: ${mhs1.nama}`); // Mengakses properti
console.log(`Status Mahasiswa 2: ${mhs2.status}`);

console.log("\n--- Memanggil Method ---");
mhs1.perkenalan(); // Memanggil method
mhs1.belajar();

console.log(""); // Spasi
mhs2.perkenalan();
mhs2.belajar();
```

#### **Langkah 3: Jalankan dan Analisis Hasil**

1.  Buka terminal di direktori `praktikum-`.
2.  Jalankan program: `node mahasiswa.js`.
3.  Amati outputnya. Perhatikan bagaimana `mhs1` dan `mhs2` adalah objek terpisah namun memiliki struktur (properti & method) yang sama, persis seperti yang didefinisikan oleh cetakan (`class`).

**Output yang Diharapkan:**

```
--- Membuat Objek Mahasiswa ---
Nama Mahasiswa 1: Andi Hermawan
Status Mahasiswa 2: Aktif

--- Memanggil Method ---
Halo, nama saya Andi Hermawan (NIM: 10119001), dari jurusan Informatika.
Andi Hermawan sedang belajar materi OOP...

Halo, nama saya Budi Setiawan (NIM: 10229005), dari jurusan Sistem Informasi.
Budi Setiawan sedang belajar materi OOP...
```
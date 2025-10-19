# **Modul Praktikum 4: JavaScript Object Literal**

## **Topik:** Object Properties & Methods

### **A. Tujuan Pembelajaran**

Setelah menyelesaikan modul ini, mahasiswa diharapkan mampu:

1.  Memahami konsep **Object** sebagai cara untuk merepresentasikan entitas dunia nyata dalam kode.
2.  Membuat *Object Literal* dengan **properties** (key-value pairs) yang sesuai.
3.  Mengakses dan memodifikasi nilai *property* menggunakan *dot notation* dan *bracket notation*.
4.  Menambahkan **methods** (fungsi) ke dalam object untuk mendefinisikan perilakunya.
5.  Memahami penggunaan dasar kata kunci `this` untuk mengakses *property* lain di dalam *method*.

### **B. Alat dan Bahan**

1.  Komputer/Laptop dengan Node.js dan Visual Studio Code.
2.  Folder proyek `praktikum-4`.

### **C. Dasar Teori**

Jika `Array` adalah **"lemari"** untuk data yang berurutan, maka **Object** adalah **"biodata"** untuk satu entitas yang memiliki banyak atribut. Object memungkinkan kita mengelompokkan variabel dan fungsi yang saling berhubungan ke dalam satu wadah.

![image](/images/4.png)

#### **1. Object Literal**

*Object Literal* adalah cara paling umum untuk membuat object di JavaScript, menggunakan kurung kurawal `{}`.

#### **2. Properties (Properti)**

Properti adalah pasangan **kunci** (*key*) dan **nilai** (*value*) yang mendefinisikan karakteristik dari sebuah object. Kunci selalu berupa *string*, sedangkan nilainya bisa berupa tipe data apa pun (string, number, boolean, array, bahkan object lain).

```javascript
// Object yang merepresentasikan data seorang mahasiswa
let mahasiswa = {
  nama: "Nama Anda",
  nim: "250660121005",
  lulus: true,
  mataKuliah: ["Dasar Pemrograman", "Kalkulus", "Pemrograman Web Backend"]
};
```

  * **Mengakses Properti**: Ada dua cara untuk mengakses nilai properti.
      * **Dot Notation (`.`):** Cara yang paling umum dan mudah dibaca.
        ```javascript
        console.log(mahasiswa.nama); // Output: "Nama Anda"
        ```
      * **Bracket Notation (`[]`):** Berguna jika nama *key* disimpan dalam variabel atau mengandung karakter khusus.
        ```javascript
        console.log(mahasiswa["nim"]); // Output: "250660121005"
        ```

#### **3. Methods (Metode)**

Method adalah **fungsi yang menjadi properti dari sebuah object**. Method mendefinisikan "perilaku" atau "aksi" yang bisa dilakukan oleh object tersebut.

  * **Kata Kunci `this`**: Di dalam sebuah method, kata kunci `this` merujuk pada **object itu sendiri**. Ini memungkinkan kita untuk mengakses properti lain dari object yang sama dari dalam method tersebut.

<!-- end list -->

```javascript
let kalkulator = {
  angka1: 10,
  angka2: 5,
  tambah: function() {
    // 'this.angka1' berarti 'kalkulator.angka1'
    return this.angka1 + this.angka2;
  },
  kurang() { // Sintaks yang lebih modern (ES6 Method Syntax)
    return this.angka1 - this.angka2;
  }
};

console.log(kalkulator.tambah()); // Output: 15
console.log(kalkulator.kurang()); // Output: 5
```

-----

### **D. Langkah-Langkah Praktikum**

**Tujuan:** Membuat sebuah object yang merepresentasikan data sebuah mobil, lengkap dengan properti dan method untuk berinteraksi.

#### **Langkah 1: Siapkan File**

1.  Buat folder baru bernama `praktikum-4`.
2.  Di dalamnya, buat file `mobil.js`.

#### **Langkah 2: Tulis Kode Program**

Salin dan pahami kode di bawah ini. Kode ini mendefinisikan sebuah object `mobil` dengan berbagai properti dan method.

```javascript
// mobil.js

// 1. Membuat Object Literal untuk mobil
const mobil = {
  // --- PROPERTIES ---
  brand: "Toyota",
  model: "Avanza",
  tahun: 2022,
  warna: "Putih",
  jarakTempuh: 5000, // dalam kilometer
  mesinMenyala: false,

  // --- METHODS ---

  // Method untuk menyalakan mesin
  nyalakanMesin: function() {
    this.mesinMenyala = true;
    console.log("Mesin telah dinyalakan!");
  },

  // Method untuk mematikan mesin
  matikanMesin() { // Menggunakan sintaks modern
    this.mesinMenyala = false;
    console.log("Mesin telah dimatikan.");
  },

  // Method untuk berkendara, yang akan menambah jarak tempuh
  berkendara(jarak) {
    if (this.mesinMenyala) {
      this.jarakTempuh += jarak; // Menambah jarak tempuh
      console.log(`Mobil berjalan sejauh ${jarak} km.`);
      console.log(`Jarak tempuh sekarang: ${this.jarakTempuh} km.`);
    } else {
      console.log("Error: Mesin belum menyala! Silakan nyalakan terlebih dahulu.");
    }
  }
};

// --- Interaksi dengan Object Mobil ---

// Menampilkan properti awal
console.log("--- Informasi Awal Mobil ---");
console.log(`Brand: ${mobil.brand}`);
console.log(`Model: ${mobil.model}`);
console.log(`Jarak Tempuh: ${mobil.jarakTempuh} km`);
console.log("-----------------------------\n");


// Mencoba berkendara saat mesin mati
console.log(">> Mencoba berkendara...");
mobil.berkendara(100); // Seharusnya menampilkan error
console.log("\n");

// Menyalakan mesin dan berkendara lagi
console.log(">> Menyalakan mesin...");
mobil.nyalakanMesin();
console.log(">> Mencoba berkendara lagi...");
mobil.berkendara(50);
console.log("\n");

// Mematikan mesin
console.log(">> Mematikan mesin...");
mobil.matikanMesin();
console.log(`Status mesin menyala: ${mobil.mesinMenyala}`);

```

#### **Langkah 3: Jalankan dan Analisis Hasil**

1.  Buka terminal di direktori `praktikum-4`.
2.  Jalankan program: `node mobil.js`.
3.  Amati outputnya. Perhatikan bagaimana nilai properti `jarakTempuh` dan `mesinMenyala` berubah setelah method dipanggil.

**Output yang Diharapkan:**

```
--- Informasi Awal Mobil ---
Brand: Toyota
Model: Avanza
Jarak Tempuh: 5000 km
-----------------------------

>> Mencoba berkendara...
Error: Mesin belum menyala! Silakan nyalakan terlebih dahulu.

>> Menyalakan mesin...
Mesin telah dinyalakan!
>> Mencoba berkendara lagi...
Mobil berjalan sejauh 50 km.
Jarak tempuh sekarang: 5050 km.

>> Mematikan mesin...
Mesin telah dimatikan.
Status mesin menyala: false
```

# **Kesimpulan**:

Pada materi ini, kita mempelajari tentang **Object**, sebuah struktur data fundamental yang memungkinkan kita untuk merepresentasikan entitas kompleks dari dunia nyata—seperti mobil, mahasiswa, atau akun bank—secara logis di dalam kode.

Berikut adalah poin-poin utamanya:

1.  **Enkapsulasi Data dan Perilaku**: Konsep terpenting dari object adalah kemampuannya untuk **menggabungkan data (properties) dan perilaku (methods) menjadi satu kesatuan**. Ini membuat kode lebih terstruktur, intuitif, dan mudah dikelola karena semua yang terkait dengan satu entitas berada di satu tempat.

2.  **Properties sebagai Atribut**: Kita belajar bahwa **properties** (pasangan *key-value*) berfungsi sebagai atribut atau karakteristik yang mendefinisikan sebuah object. Fleksibilitasnya memungkinkan nilai properti bisa berupa tipe data apa pun, dari string sederhana hingga array atau bahkan object lain.

3.  **Methods sebagai Aksi**: **Methods** adalah fungsi yang "hidup" di dalam object, mendefinisikan apa yang bisa dilakukan oleh object tersebut. Ini adalah langkah awal menuju pemrograman berorientasi objek (OOP), di mana data dan fungsi yang mengoperasikannya saling terikat.

4.  **Kekuatan `this`**: Kita memahami bahwa kata kunci `this` adalah jembatan penting di dalam method. `this` memberikan akses ke properti lain dalam object yang sama, memungkinkan method untuk berinteraksi dan memodifikasi "dirinya sendiri".

Secara singkat, jika materi sebelumnya mengajarkan kita cara bekerja dengan daftar data _(Array)_, materi ini mengajarkan cara membuat _"cetakan"_ untuk data tunggal yang terstruktur dan interaktif. 

Penguasaan object adalah kunci untuk membangun aplikasi yang lebih kompleks dan logis di JavaScript.
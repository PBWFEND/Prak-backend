# **Modul Praktikum 5: JavaScript Modern (ES6+)**

## **Topik:** `let/const`, _Arrow Function_, _Spread Operator_, dan _Destructuring_

-----

## **A. Tujuan Pembelajaran**

Setelah menyelesaikan modul ini, mahasiswa diharapkan mampu:

1.  Memahami perbedaan *scope* antara `var`, `let`, dan `const`.

2.  Menulis fungsi secara ringkas menggunakan **Arrow Function** (`=>`).

3.  Menggunakan **Destructuring** untuk "membongkar" nilai dari object atau array ke dalam variabel.

4.  Menggunakan **Spread Operator** (`...`) untuk menyalin dan menggabungkan object atau array.

5.  Menerapkan konsep [ES6+](https://www.w3schools.com/js/js_es6.asp) untuk me-*refactor* kode yang ada (dari modul 4) menjadi lebih bersih dan modern.

### **B. Alat dan Bahan**

1.  Komputer/Laptop dengan Node.js dan Visual Studio Code.

2.  Kode dari Modul 4 (file `mobil.js`).

3.  Folder proyek baru: `praktikum-5`.

### **C. Dasar Teori**

ES6 [(ECMAScript 2015)](https://www.w3schools.com/js/js_es6.asp) adalah pembaruan besar untuk JavaScript yang memperkenalkan banyak fitur untuk membuat kode lebih mudah ditulis dan dibaca.

#### **1. `let` dan `const` (Pengganti `var`)**

  * **`var`**: Memiliki *function scope*. Sebaiknya **dihindari** dalam kode modern karena perilakunya bisa membingungkan.
  
  * **`let`**: Memiliki *block scope* (`{}`). Nilai variabelnya **bisa diubah**. Gunakan ini jika Anda tahu nilainya akan berubah.
  
  * **`const`**: Memiliki *block scope* (`{}`). Nilainya **tidak bisa di-assign ulang** (konstan). Ini adalah pilihan *default* terbaik. Gunakan `const` sebisa mungkin, dan ganti ke `let` hanya jika perlu.
    ```javascript
    const nama = "Budi";
    // nama = "Andi"; // Ini akan error

    let umur = 20;
    umur = 21; // Ini valid
    ```

### **2. Arrow Functions (`=>`)**

Ini adalah sintaks yang lebih pendek untuk menulis fungsi.

```javascript
// Cara lama (Function Expression)
const tambah_lama = function(a, b) {
  return a + b;
};

// Cara baru (Arrow Function)
const tambah_baru = (a, b) => {
  return a + b;
};

// Jika isi fungsi hanya satu baris (return), bisa lebih ringkas:
const kali = (a, b) => a * b; // Otomatis me-return a * b
```

**Peringatan Penting tentang `this`**: *Arrow function* tidak memiliki konteks `this`-nya sendiri. Ia "meminjam" `this` dari lingkup di luarnya. Karena itu, *arrow function* **tidak cocok** untuk digunakan sebagai *method* utama di dalam *object literal* jika Anda perlu mengakses `this` object tersebut. (Gunakan sintaks *method shorthand* seperti di Modul 4).

### **3. Destructuring Assignment **
  
_Destructuring Assignment_ adalah fitur yang sangat berguna dan populer dalam JavaScript modern. 

Ini mempermudah pengambilan nilai dari object atau array tanpa perlu menulis kode yang panjang dan rumit.

  * **Object Destructuring**:
    ```javascript
    const mahasiswa = {
      nama: "Dewi",
      semester: 5
    };
    // Mengambil properti 'nama' dan 'semester' menjadi variabel
    const { nama, semester } = mahasiswa;
    console.log(nama); // Output: "Dewi"
    console.log(semester); // Output: 5
    ```
  * **Array Destructuring**:
    ```javascript
    const buah = ["Apel", "Mangga", "Jeruk"];
    const [buah1, buah2] = buah;
    console.log(buah1); // Output: "Apel"
    console.log(buah2); // Output: "Mangga"
    ```

### **4. Spread Operator (`...`)**

Operator "tiga titik" ini berfungsi untuk "menebarkan" atau "membuka" elemen array atau properti object. Sangat berguna untuk menyalin data secara *immutable* (tanpa mengubah aslinya).

  * **Array**:
    ```javascript
    const sayuran = ["Bayam", "Kangkung"];
    const menuLengkap = [...sayuran, "Kol", "Wortel"];
    // Hasil: ["Bayam", "Kangkung", "Kol", "Wortel"]
    ```
  * **Object**:
    ```javascript
    const dataLama = { nama: "Andi", umur: 30 };
    const dataBaru = { ...dataLama, pekerjaan: "Developer" };
    // Hasil: { nama: "Andi", umur: 30, pekerjaan: "Developer" }
    ```

-----

## **D. Langkah-Langkah Praktikum (Refactor Kode)**

### **Tujuan:** Memperbarui file `mobil.js` dari Modul 4 agar menggunakan sintaks ES6+.

#### **Langkah 1: Salin dan Persiapkan File**

1.  Buat folder `praktikum-5`.

2.  Salin file `mobil.js` dari `praktikum-4` ke dalam `praktikum-5`.

3.  Ubah nama file tersebut menjadi `mobil_modern.js`.

#### **Langkah 2: Buka `mobil_modern.js` dan Refactor**

Ini adalah kode **sebelum** di-refactor (dari Modul 4). Kita akan mengubahnya.

```javascript
// Kode LAMA (mobil.js)
const mobil = {
  brand: "Toyota",
  model: "Avanza",
  // ... properti lain
  mesinMenyala: false,

  nyalakanMesin: function() { // <-- Target Refactor 1
    this.mesinMenyala = true;
    console.log("Mesin telah dinyalakan!");
  },
  
  matikanMesin() { // <-- Ini sudah ES6+ (Method Shorthand), biarkan
    this.mesinMenyala = false;
    console.log("Mesin telah dimatikan.");
  },

  berkendara(jarak) {
    if (this.mesinMenyala) {
      // ...
    } else {
      // ...
    }
  }
};
```

**Refactor Kode:**

1.  **Method Shorthand**: Ubah `nyalakanMesin: function() { ... }` menjadi sintaks method shorthand ES6 agar konsisten dengan `matikanMesin()`.

<!-- end list -->

```javascript
// mobil_modern.js

// 1. Gunakan 'const' untuk object karena referensinya tidak berubah
const mobil = {
  // --- PROPERTIES ---
  brand: "Toyota",
  model: "Avanza",
  tahun: 2022,
  warna: "Putih",
  jarakTempuh: 5000, 
  mesinMenyala: false,

  // --- METHODS (ES6 Method Shorthand) ---

  // REFACTOR 1: Ubah 'nyalakanMesin: function()' menjadi:
  nyalakanMesin() {
    this.mesinMenyala = true;
    console.log("Mesin telah dinyalakan!");
  },

  matikanMesin() {
    this.mesinMenyala = false;
    console.log("Mesin telah dimatikan.");
  },

  berkendara(jarak) {
    if (this.mesinMenyala) {
      this.jarakTempuh += jarak; 
      console.log(`Mobil berjalan sejauh ${jarak} km.`);
      console.log(`Jarak tempuh sekarang: ${this.jarakTempuh} km.`);
    } else {
      console.log("Error: Mesin belum menyala! Silakan nyalakan terlebih dahulu.");
    }
  }
};

// --- Interaksi dengan Object (Tetap sama) ---
console.log("--- Menjalankan Interaksi ---");
mobil.nyalakanMesin();
mobil.berkendara(50);
console.log("------------------------------\n");


// --- PRAKTIKUM TAMBAHAN: Demo ES6+ ---

// 2. Demo Destructuring
// Ambil properti 'brand' dan 'jarakTempuh' dari 'mobil'
const { brand, jarakTempuh, warna } = mobil;

console.log("--- Demo Destructuring ---");
console.log(`Brand mobil ini adalah: ${brand}`);
console.log(`Warna: ${warna}, Jarak Tempuh: ${jarakTempuh} km`);
console.log("------------------------------\n");


// 3. Demo Spread Operator (Membuat salinan mobil untuk dijual)
const mobilDijual = {
  ...mobil, // Salin semua properti dari 'mobil'
  harga: 150000000, // Tambah properti baru
  warna: "Silver" // Ubah properti 'warna'
};

console.log("--- Demo Spread Operator ---");
console.log("Data Mobil Asli (Putih):");
console.log(mobil);
console.log("\nData Mobil Dijual (Silver):");
console.log(mobilDijual);
console.log("------------------------------");
```

### **Langkah 3: Jalankan dan Analisis Hasil**

1.  Buka terminal di direktori `praktikum-5`.

2.  Jalankan program: `node mobil_modern.js`.

3.  Amati outputnya. Anda akan melihat interaksi mobil berjalan seperti sebelumnya, ditambah output baru dari demo Destructuring dan Spread Operator. 

Perhatikan bagaimana `mobilDijual` memiliki data yang berbeda dari `mobil` asli, membuktikan operasinya adalah *copy*, bukan *reference*.

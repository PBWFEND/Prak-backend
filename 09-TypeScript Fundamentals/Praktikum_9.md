# **Modul Praktikum: TypeScript Fundamentals**

**Topik:** Static Typing, Interfaces, dan Generics

-----

## **A. Tujuan Pembelajaran**

Setelah menyelesaikan modul ini, mahasiswa diharapkan mampu:

1.  Menjelaskan perbedaan antara *dynamic typing* (JavaScript) dan *static typing* (TypeScript).
2.  Menggunakan tipe data dasar (primitif) dan tipe data kompleks (array, object) di TypeScript.
3.  Mendefinisikan "kontrak" atau "bentuk" data menggunakan **Interfaces**.
4.  Menulis fungsi yang fleksibel dan *type-safe* menggunakan **Generics**.
5.  Melakukan setup proyek Node.js sederhana dengan TypeScript.

## **B. Alat dan Bahan**

1.  Node.js (v18+) dan Visual Studio Code.
2.  *Library* yang akan di-install: `typescript`, `ts-node`, `@types/node`.

## **C. Dasar Teori**

### 1\. Masalah JavaScript: Dynamic Typing

Di JavaScript murni, Anda bisa melakukan ini:

```javascript
let umur = 20; // Awalnya 'number'
umur = "dua puluh"; // Tiba-tiba jadi 'string'
```

Ini adalah **Dynamic Typing**. Fleksibel, tapi sangat berbahaya di proyek besar. Anda bisa saja tidak sengaja mengirim `string` ke fungsi yang mengharapkan `number`, dan program Anda akan *crash* saat *runtime* (ketika sudah berjalan).

### 2\. Solusi TypeScript: Static Typing

[TypeScript](https://www.typescriptlang.org/) adalah perluasan dari JavaScript yang menambahkan static typing. Dengan TypeScript, Anda dapat mendeklarasikan dan memeriksa tipe data saat menulis kode, sehingga membantu mendeteksi kesalahan lebih awal dan meningkatkan keandalan serta maintainability aplikasi.

```typescript
let umur: number = 20;
// umur = "dua puluh"; // ERROR! 
// 
// Editor Anda akan langsung merah.
```

Ini mencegah *bug* sebelum kode dijalankan (saat *compile-time*). Tipe dasar meliputi: `string`, `number`, `boolean`, `any` (sebisa mungkin dihindari), `string[]` (array of strings), `Array<number>` (juga array of numbers).

### 3\. Interfaces (Kontrak Data)

Ini adalah konsep **paling penting** untuk *backend*. **Interface** adalah "cetakan" atau "kontrak" yang mendefinisikan bentuk sebuah object. Ini memastikan data yang Anda kirim atau terima (misal dari *database* atau `req.body`) memiliki properti yang benar.

```typescript
interface Mahasiswa {
  nim: string;
  nama: string;
  semester: number;
  sudahLulus?: boolean; // '?' berarti properti ini opsional
}

// Kita 'memaksa' variabel ini untuk mengikuti kontrak Mahasiswa
const mhs1: Mahasiswa = {
  nim: "10119001",
  nama: "Budi",
  semester: 7
  // Jika kita lupa 'nim', TS akan error.
  // Jika kita tambah 'alamat', TS juga akan error.
};
```

### 4\. Generics (Tipe Fleksibel)

Bagaimana jika Anda ingin membuat fungsi yang bisa menerima tipe apa saja, tapi tetap *type-safe*?

  * **Masalah:** `function(arg: any): any` -\> Ini *type-safe*-nya hilang.
  * **Solusi:** **Generics**. Gunakan `<T>` (atau `<U>`, `<V>`) sebagai "placeholder" untuk tipe data.

Bayangkan Anda ingin membuat fungsi yang mengubah *item* apa pun menjadi *array* berisi item itu.

```typescript
// <T> adalah deklarasi Generics
function buatArray<T>(input: T): T[] {
  return [input];
}

let arrayAngka = buatArray<number>(100);    // T menjadi 'number'. Hasil: number[]
let arrayString = buatArray<string>("Halo"); // T menjadi 'string'. Hasil: string[]
```

Fungsi Anda sekarang fleksibel (generik) sekaligus *type-safe*.

-----

## **D. Praktikum: Program Sederhana dengan TypeScript**

**Tujuan:** Membuat program konsol sederhana untuk mengelola inventaris buku menggunakan semua konsep dasar TS.

## Bagian 1: Setup Proyek

1.  Buat folder baru: `mkdir praktikum-ts-dasar && cd praktikum-ts-dasar`

2.  Inisialisasi proyek Node.js: `npm init -y`

3.  Install *dependencies* (sebagai *dev dependencies*):

    ```bash
    npm install -D typescript ts-node @types/node
    ```

4.  Buat file konfigurasi TypeScript. Jalankan perintah ini:

    ```bash
    npx tsc --init
    ```

    Ini akan membuat file `tsconfig.json`. Buka file itu dan pastikan (atau ubah) beberapa baris ini:

      * `"target": "ES2020"` (atau lebih baru)
      * `"module": "NodeNext"`
      * `"outDir": "./dist"`
      * `"rootDir": "./src"`
      * `"strict": true` (Sangat penting\!)

5.  Buat folder `src` dan di dalamnya buat file `index.ts`.

## Bagian 2: Tulis Kode (`src/index.ts`)

Salin dan pahami kode berikut:

```typescript
// src/index.ts

// --- 1. Interface (Kontrak Data) ---
// Mendefinisikan bentuk data untuk sebuah Buku
interface Buku {
  id: number;
  judul: string;
  penulis: string;
  tersedia: boolean;
}

// --- 2. Static Typing & Functions ---
// Kita gunakan 'Interface' sebagai tipe data
let inventaris: Buku[] = [];

// Fungsi ini MENGHARUSKAN argumennya berbentuk 'Buku'
function tambahBuku(buku: Buku) {
  inventaris.push(buku);
  console.log(`Buku "${buku.judul}" telah ditambahkan.`);
}

function tampilkanInventaris(daftar: Buku[]) {
  console.log("\n--- Inventaris Perpustakaan ---");
  daftar.forEach(buku => {
    const status = buku.tersedia ? "Tersedia" : "Dipinjam";
    console.log(`[${buku.id}] ${buku.judul} oleh ${buku.penulis} (${status})`);
  });
}

// --- 3. Generics (Fungsi Utility) ---
// Fungsi generik untuk mencari item dalam array berdasarkan propertinya
// T = Tipe item (misal: Buku)
// K = Kunci dari T (misal: 'id' atau 'judul')
function cariItem<T, K extends keyof T>(
  items: T[], 
  key: K, 
  value: T[K]
): T | undefined {
  return items.find(item => item[key] === value);
}


// --- 4. Menjalankan Program ---

// Menggunakan static typing saat membuat data
const buku1: Buku = {
  id: 1,
  judul: "TypeScript in Action: From Fundamentals to Advanced Patterns",
  penulis: "Asher Vale",
  tersedia: true
};

const buku2: Buku = {
  id: 2,
  judul: "Learning TypeScript",
  penulis: "Josh Goldberg",
  tersedia: false
};

// Menjalankan fungsi
tambahBuku(buku1);
tambahBuku(buku2);
tampilkanInventaris(inventaris);

// Menggunakan fungsi Generik
console.log("\n--- Hasil Pencarian Generik ---");
const bukuDitemukan = cariItem<Buku, "id">(inventaris, "id", 2);
// const bukuDitemukan = cariItem(inventaris, "id", 2); // TS juga bisa menebaknya

if (bukuDitemukan) {
  console.log(`Ditemukan buku dengan ID 2: ${bukuDitemukan.judul}`);
}
```

### Bagian 3: Menjalankan Program

1.  Buka terminal Anda di *root* folder proyek.
2.  Gunakan `ts-node` untuk menjalankan file `.ts` Anda secara langsung:
    ```bash
    npx ts-node src/index.ts
    ```
3.  **Output yang Diharapkan:**
    ```
    Buku "TypeScript in Action: From Fundamentals to Advanced Patterns" telah ditambahkan.
    Buku "Learning TypeScript" telah ditambahkan.

    --- Inventaris Perpustakaan ---
    [1] TypeScript in Action: From Fundamentals to Advanced Patterns oleh Asher Vale (Tersedia)
    [2] Learning TypeScript oleh Josh Goldberg (Dipinjam)

    --- Hasil Pencarian Generik ---
    Ditemukan buku dengan ID 2: Learning TypeScript
    ```
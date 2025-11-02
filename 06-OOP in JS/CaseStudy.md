# Studi Kasus 6: Inheritance & Encapsulation

## **1. Inheritance & Encapsulation**

## **Skenario**

Kita akan memperluas class `Mahasiswa`. Seorang `Mahasiswa` pada dasarnya adalah `Orang`. Kita akan membuat class `Orang` sebagai *parent*, dan `Mahasiswa` sebagai *child*. Kita juga akan mengenkapsulasi data SKS agar tidak bisa diubah sembarangan.

### **Tugas**

Buat file `kampus.js`.

1.  Buat class `Orang` dengan `constructor(nama, umur)` dan method `sapa()`.
2.  Refactor class `Mahasiswa` agar `extends Orang`.
3.  Di constructor `Mahasiswa`, panggil `super()` untuk mengirim `nama` dan `umur` ke `Orang`.
4.  Tambahkan *private field* `#sks = 0` di `Mahasiswa`.
5.  Buat method `ambilSKS(jumlah)` untuk menambah `#sks` secara aman.
6.  Buat method `lihatSKS()` untuk menampilkan `#sks`.
7.  Buat instance-nya dan demonstrasikan.


## **2. Sistem Inventaris Toko Online**

## **Skenario**

Anda ditugaskan untuk membuat sistem manajemen inventaris sederhana. Di toko Anda, ada berbagai jenis produk. Semua produk pasti memiliki **SKU** (Stock Keeping Unit / Kode unik), **Nama Produk**, dan **Harga**.

Namun, ada kategori produk khusus. Misalnya, **Buku** memiliki data tambahan (Penulis), dan **Elektronik** memiliki data tambahan (Masa Garansi).

Selain itu, **Stok** barang adalah data yang sensitif. Anda tidak ingin stok bisa diubah sembarangan (misalnya, diatur jadi negatif). Stok hanya boleh berkurang jika ada "penjualan" dan bertambah jika ada "pembelian stok baru".

### **Tugas**

Buatlah struktur Class OOP untuk skenario ini:

1.  Buat **Parent Class** bernama `Product`.
2.  Buat dua **Child Class** bernama `Book` dan `Electronic` yang mewarisi (`extends`) dari `Product`.
3.  Terapkan **Encapsulation** pada properti `stok` menggunakan *private field* (`#`).


### **Spesifikasi Class**

**1. `Product` (Parent Class)**

  * **Properties:**
      * `sku` (String)
      * `name` (String)
      * `price` (Number)
      * `#stock` (Private Number) -\> *Enkapsulasi*
  * **Constructor:**
      * Menerima `sku`, `name`, `price`, dan `initialStock`.
  * **Methods:**
      * `addStock(quantity)`: Menambah `#stock` sejumlah `quantity`.
      * `sell(quantity)`: Mengurangi `#stock` sejumlah `quantity`. Harus ada **validasi**: jika `quantity` lebih besar dari `#stock`, penjualan gagal dan cetak pesan error.
      * `displayInfo()`: Mencetak info dasar (Nama, Harga, Stok Tersisa).

**2. `Book` (Child Class)**

  * **Inheritance:** `extends Product`.
  * **Properties (tambahan):**
      * `author` (String)
  * **Constructor:**
      * Menerima semua data `Product` ditambah `author`.
      * Harus memanggil `super()` untuk mengirim data ke `Product`.
  * **Methods (Override):**
      * `displayInfo()`: Menampilkan info `Product` (memanggil `super.displayInfo()`) **DAN** info `author`.

**3. `Electronic` (Child Class)**

  * **Inheritance:** `extends Product`.
  * **Properties (tambahan):**
      * `warrantyMonths` (Number)
  * **Constructor:**
      * Menerima semua data `Product` ditambah `warrantyMonths`.
      * Harus memanggil `super()`.
  * **Methods (Override):**
      * `displayInfo()`: Menampilkan info `Product` (memanggil `super.displayInfo()`) **DAN** info `warrantyMonths`.


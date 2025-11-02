# **Studi Kasus 6: Inheritance & Encapsulation**

## **1. Mahasiswa sebagai Pewaris dari Orang**

## **Skenario**

Kita akan membangun hierarki kelas menggunakan **inheritance**.  
Seorang `Mahasiswa` adalah jenis khusus dari `Orang`. Oleh karena itu:
- Buat class `Orang` sebagai **parent class**.
- Buat class `Mahasiswa` sebagai **child class** yang mewarisi `Orang`.
- Terapkan **enkapsulasi** pada data total SKS agar tidak dapat diubah secara langsung dari luar kelas.


### **Tugas**

Buat file bernama `kampus.js` dan lengkapi sesuai langkah berikut:

1. **Buat class `Orang`**  
   - Memiliki `constructor(nama, umur)` yang menyimpan `nama` dan `umur` sebagai properti.  
   - Memiliki method `sapa()` yang mencetak:  
    
     ```plaintext
     Halo, nama saya [nama], umur saya [umur] tahun.
     ```

2. **Refactor class `Mahasiswa` agar mewarisi `Orang`**  
   - Gunakan kata kunci `extends Orang`.

3. **Panggil `super()` di constructor `Mahasiswa`**  
   - Kirim parameter `nama` dan `umur` ke constructor parent (`Orang`).

4. **Tambahkan private field `#sks` di dalam class `Mahasiswa`**  
   - Inisialisasi dengan nilai `0`.  
   - Gunakan sintaks `#` untuk menjadikannya **benar-benar privat** (tidak bisa diakses dari luar).

5. **Buat method `ambilSKS(jumlah)`**  
   - Validasi: `jumlah` harus berupa **angka** dan **tidak negatif**.  
   - Jika valid, tambahkan `jumlah` ke `#sks`.  
   - Tampilkan pesan konfirmasi (contoh: "Andi berhasil mengambil 3 SKS. Total: 3").

6. **Buat method `lihatSKS()`**  
   - Menampilkan total SKS saat ini dalam format:  
    
     ```plaintext
     Total SKS [nama]: [sks]
     ```

7. **Buat demonstrasi penggunaan di akhir file**  
   - Buat **1 instance `Orang`** dan panggil `sapa()`.  
   - Buat **1 instance `Mahasiswa`**, lalu:  
     - Panggil `sapa()` (pastikan dari parent).  
     - Panggil `ambilSKS()` beberapa kali (termasuk input valid & tidak valid).  
     - Panggil `lihatSKS()`.  
     - *(Opsional)* Coba akses langsung `#sks` dari luar → harus error (untuk membuktikan enkapsulasi).

---

### **Contoh Output yang Diharapkan**

```plaintext
Halo, nama saya Budi, umur saya 25 tahun.

Halo, nama saya Andi, umur saya 20 tahun.
Andi berhasil mengambil 3 SKS. Total SKS: 3
Andi berhasil mengambil 4 SKS. Total SKS: 7
Total SKS Andi: 7
Jumlah SKS harus angka positif!
Jumlah SKS harus angka positif!
```


### **Catatan Penting**

- Gunakan **private field** `#sks` (bukan `_sks` atau `sks`), agar benar-benar terenkapsulasi.
- Pastikan `super()` dipanggil **sebelum** mengakses `this` di constructor `Mahasiswa`.
- File harus bisa dijalankan dengan perintah:  
  ```bash
  node kampus.js
  ```

## 2. Sistem Inventaris Toko Online

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

> Selamat mengerjakan!
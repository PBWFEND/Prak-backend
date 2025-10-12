# Studi Kasus 3: Pengolahan Data Penjualan

## Skenario

Sebagai seorang programmer di sebuah perusahaan *e-commerce*, Anda diberi tugas untuk mengolah data mentah transaksi yang tersedia dalam bentuk `array`. 

Tugas Anda adalah memproses data tersebut untuk menghasilkan laporan penjualan sederhana.

## **Tugas**

Buatlah script `penjualan.js`.

1.  Gunakan data transaksi berikut:
    ```javascript
    const transaksi = [
      { id: 'TRX001', produk: 'Laptop', harga: 12000000, jumlah: 1 },
      { id: 'TRX002', produk: 'Mouse', harga: 150000, jumlah: 2 },
      { id: 'TRX003', produk: 'Keyboard', harga: 750000, jumlah: 1 },
      { id: 'TRX004', produk: 'Monitor', harga: 2500000, jumlah: 1 },
      { id: 'TRX005', produk: 'Mousepad', harga: 50000, jumlah: 3 },
      { id: 'TRX006', produk: 'Mouse', harga: 150000, jumlah: 1 },
    ];
    ```
2.  **Tugas 1 (Filter):** Buat sebuah array baru bernama `transaksiMouse` yang hanya berisi transaksi untuk produk 'Mouse'.

3.  **Tugas 2 (Map):** Buat sebuah array baru bernama `laporanPenjualan`. Transformasi `transaksi` menjadi array string dengan format: `"ID: [id], Produk: [produk], Total: Rp [harga * jumlah]"`. Format total harga agar mudah dibaca (gunakan `.toLocaleString('id-ID')`).

4.  **Tugas 3 (Reduce - *Challenge*):** Hitung total pendapatan dari semua transaksi.
      * *Petunjuk*: Anda bisa menggunakan `for` loop, atau jika ingin tantangan, cari tahu cara menggunakan method `array.reduce()`.

5.  Cetak semua hasil (array `transaksiMouse`, array `laporanPenjualan`, dan total pendapatan) ke konsol dengan judul yang jelas.
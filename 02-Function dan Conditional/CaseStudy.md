# Studi Kasus 2: Program Kasir Kafe Sederhana

## A. **Skenario**

Anda diminta membuat program kasir sederhana untuk "Kafe Koding". Program ini harus bisa menghitung total harga pesanan berdasarkan menu yang dipilih dan memberikan diskon jika total pembelian mencapai nominal tertentu.

## B. **Tugas**

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
# Studi Kasus 4: Pengelolaan Akun Bank Sederhana

## **Skenario**

Anda diminta untuk membuat prototipe object untuk mengelola akun bank nasabah. Object ini harus bisa menyimpan informasi saldo dan menyediakan fungsi untuk setor dan tarik tunai.

## **Tugas**

Buatlah script `akun_bank.js`.

1.  Buat sebuah object bernama `akun` dengan properti berikut:
   
      * `nomorAkun`: String (contoh: 'ACC001')
      * `namaPemilik`: String (contoh: 'Nama Anda')
      * `saldo`: Number (saldo awal, misal: 500000)

2.  Tambahkan dua method ke object `akun`:
   
      * `setor(jumlah)`: Method ini menerima satu argumen `jumlah`. Ia harus **menambahkan** `jumlah` tersebut ke properti `saldo` dan mencetak pesan konfirmasi ke konsol, seperti: `"Setoran sebesar Rp 50.000 berhasil. Saldo baru: Rp 550.000."`
      * `tarik(jumlah)`: Method ini menerima satu argumen `jumlah`. Ia harus melakukan **validasi**:
          * Jika `jumlah` yang akan ditarik **lebih besar** dari `saldo`, cetak pesan error: `"Saldo tidak mencukupi untuk penarikan."` dan jangan ubah saldo.
          * Jika saldo mencukupi, **kurangi** properti `saldo` dengan `jumlah` tersebut dan cetak pesan konfirmasi, seperti: `"Penarikan sebesar Rp 100.000 berhasil. Saldo sisa: Rp 450.000."`

3.  Di akhir script, demonstrasikan penggunaan object tersebut:
   
      * Tampilkan saldo awal.
      * Panggil method `setor()` dengan nominal tertentu.
      * Panggil method `tarik()` dengan nominal yang valid.
      * Panggil method `tarik()` dengan nominal yang melebihi saldo.
      * Tampilkan saldo akhir.
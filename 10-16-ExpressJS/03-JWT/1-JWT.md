# Apa itu JWT (JSON Web Token)?

JWT, atau JSON Web Token, adalah standar terbuka (RFC 7519) yang digunakan untuk berbagi informasi keamanan antara klien dan server dalam bentuk objek JSON. Informasi ini bisa diverifikasi dan dipercaya karena telah ditandatangani secara digital. JWT umumnya digunakan untuk otentikasi dan otorisasi.

## Struktur JWT

JWT terdiri dari tiga bagian yang dipisahkan oleh titik `(.)`:

1. **Header**: Bagian ini biasanya terdiri dari dua bagian: jenis token, yang merupakan JWT, dan algoritma penandatanganan yang digunakan, seperti _HMAC SHA256_ atau RSA.

  ```json
   {
     "alg": "HS256",
     "typ": "JWT"
   }
  ```

2. **Payload**: Bagian ini berisi klaim, yaitu pernyataan tentang entitas (biasanya pengguna) dan data tambahan. Ada tiga jenis klaim: terdaftar, publik, dan privat.

   ```json
   {
     "sub": "1234567890",
     "name": "John Doe",
     "admin": true
   }
   ```

3. **Signature**: Untuk membuat bagian ini, kita perlu mengambil encoded header, encoded payload, sebuah secret, dan algoritma yang ditentukan di header, lalu menandatangannya.

   ```json
   HMACSHA256(
     base64UrlEncode(header) + "." +
     base64UrlEncode(payload),
     secret)
   ```

JWT biasanya terlihat seperti ini:

```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

## Penggunaan JWT

JWT dapat digunakan dalam dua skenario utama:

1. **Otentikasi**: Setelah pengguna berhasil login, server membuat JWT dan mengirimkannya kembali ke klien. Klien kemudian menyimpan token tersebut (biasanya di localStorage atau cookies) dan mengirimkannya pada setiap permintaan berikutnya ke server. Server memverifikasi token pada setiap permintaan untuk memastikan pengguna sah.
2. **Otorisasi**: JWT dapat digunakan untuk memastikan pengguna memiliki izin untuk mengakses sumber daya atau layanan tertentu. Dengan memeriksa klaim dalam payload JWT, server dapat menentukan hak akses pengguna.

## Kelebihan JWT:

- **Portabilitas**: JWT adalah format berbasis JSON yang mudah digunakan dan dibaca dalam berbagai bahasa pemrograman.
- **Kemandirian**: Semua informasi yang diperlukan untuk memverifikasi pengguna disimpan dalam token itu sendiri, sehingga mengurangi kebutuhan untuk bergantung pada penyimpanan sesi di server.
- **Keamanan**: JWT ditandatangani menggunakan algoritma kriptografis yang memastikan bahwa payload tidak dapat diubah tanpa mendeteksi perubahan tersebut.
- **Skalabilitas**: Karena JWT adalah self-contained, server dapat menangani lebih banyak permintaan tanpa perlu memeriksa database atau penyimpanan sesi pada setiap permintaan.

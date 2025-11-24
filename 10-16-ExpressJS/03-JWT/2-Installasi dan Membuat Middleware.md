# Installasi dan Membuat Middleware

Setelah mengetahui apa itu JWT, maka sekarang kita akan belajar bagaimana cara menginstall JWT di dalam project Express.


## Langkah 1 - Installasi JWT

Silahkan teman-teman masuk ke dalam folder project, kemudian jalankan perintah berikut ini di dalam terminal/CMD.

```bash
npm install jsonwebtoken@9.0.2
```
## Langkah 2 -Menambahkan Secreet Key

Setelah berhasil melakukan installasi, selanjutnya adalah menambahkan secret key di dalam file `.env.`

Pertama kita akan lakukan generate string random yang nanti dipakai di secreet key. Silahkan teman-teman jalankan perintah berikut ini di dalam terminal/CMD.

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Jika berhasil, nanti teman-teman akan mendapatkan kode random.

Setelah itu, silahkan teman-teman buka file `.env` kemudian tambahkan kode berikut ini.

```env
JWT_SECRET=paste_kode_random_hasil_generate_sebelumnya
```
Silahkan teman-teman ganti `paste_kode_random_hasil_generate_sebelumnya` dengan kode random yang baru saja digenerate.

gambar

## Langkah 3 - Membuat Middleware

Sekarang, kita akan membuat middleware yang berfungsi untuk memverifikasi token JWT. 

Silahkan teman-teman buat folder baru dengan nama `middlewares` dan di dalamnya silahkan buat file baru dengan nama `auth.js` dan masukkan kode berikut ini di dalamnya.

```javascript
// Import express
const express = require('express');

// Import jwt
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Get token
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Unauthenticated.' });

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;
```
gambar
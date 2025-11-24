# Membuat Helper Prisma Client

`Prisma` Client digunakan untuk mempermudah kita dalam query ke dalam database, karena kita akan memanggil method-method yang sudah disediakan.

# Langkah 1 - Install Prisma Client

Silahkan teman-teman jalankan perintah berikut ini di dalam terminal/CMD dan pastikan sudah berada di dalam project -nya.

```bash
npm install @prisma/client@5.13.0
```
# Langkah 2 - Membuat Helper Prisma Client

Agar tidak menulis kode secara berulang-ulang untuk `Prisma Client`, maka kita akan jadikan sebagai `helper`.

Silahkan buat folder baru dengan nama `client` di dalam folder `prisma` dan di dalam folder `client` tersebut silahkan buat file baru dengan nama `index.js`, kemudian masukkan kode berikut ini di dalamnya.

```javascript
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;
```
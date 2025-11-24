# Membuat Restful API Get Data Users

Setelah berhasil membuat proses login dan men-generate token `JWT`, maka sekarang kita akan lanjutkan belajar membuat CRUD untuk data user.

Pada `CRUD` data user ini akan bersifat private, artinya hanya bisa dieksekusi jika ada token JWT yang dikirimkan. Artinya, nanti pada setiap route-nya akan ditambahkan middleware verifyToken yang sudah kita buat sebelumnya pada modul sebelumnya `JWT (JSON Web Token)`.

Pada materi kali ini, kita akan belajar bagaimana cara menampilkan `list data users` dari `database` dalam format `JSON`.

## Langkah 1 - Membuat Controller User

Silahkan teman-teman buat file baru dengan nama `UserController.js` di dalam folder controllers, kemudian masukkan kode berikut ini di dalamnya.

```javascript
//import express
const express = require("express");

//import prisma client
const prisma = require("../prisma/client");

//function findUsers
const findUsers = async (req, res) => {
    try {

        //get all users from database
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
            orderBy: {
                id: "desc",
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: "Get all users successfully",
            data: users,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = { findUsers };
```
Dari penambahan kode di atas, pertama kita import Express.

```javascript
//import express
const express = require("express");
```
Kemudian kita import Prisma Client.

```javascript
//import prisma client
const prisma = require("../prisma/client");
```
Setelah itu, kita buat function baru dengan nama `findUsers`.

```javascript
//function findUsers
const findUsers = async (req, res) => {
    //...
}
```

Di dalamnya, kita buat variable baru dengan nama `users` yang berisi Prisma untuk get data.

```javascript
//get all users from database
const users = await prisma.user.findMany({
    select: {
        id: true,
        name: true,
        email: true,
    },
    orderBy: {
        id: "desc",
    },
});
```
Kode di atas digunakan untuk mengambil semua data pengguna dari tabel `users` dalam database. Data yang diambil hanya mencakup kolom `id`, `name`, dan `email`. Selain itu, hasilnya diurutkan berdasarkan kolom `id` secara descending.

Setelah itu, kita lakukan return dalam format JSON dan berisi informasi list data users yang didpaatkan dari database.

```javascript
//send response
res.status(200).send({
    success: true,
    message: "Get all users successfully",
    data: users,
});
```
## Langkah 2 - Membuat Route API Get All Users

Silahkan teman-teman buka file `routes/index.js`, kemudian ubah semua kode-nya menjadi seperti berikut ini.

```javascript
//import express
const express = require('express')

//init express router
const router = express.Router();

//import verifyToken
const verifyToken = require('../middlewares/auth');

//import register controller
const registerController = require('../controllers/RegisterController');

//import login controller
const loginController = require('../controllers/LoginConroller');

//import user controller
const userController = require('../controllers/UserController');

//import validate register and login
const { validateRegister, validateLogin } = require('../utils/validators/auth');

//define route for register
router.post('/register', validateRegister, registerController.register);

//define route for login
router.post('/login', validateLogin, loginController.login);

//define route for user
router.get('/admin/users', verifyToken, userController.findUsers);

//export router
module.exports = router
```

Dari perubahan kode di atas, pertama kita import middleware `verifyToken`.

```javascript
//import verifyToken
const verifyToken = require('../middlewares/auth');
```
Setelah itu, kita import contorller `UserController`.

```javascript
//import user controller
const userController = require('../controllers/UserController');
```
Setelah itu, kita siapkan route untuk menampilkan list data users.

```javascript
//define route for user
router.get('/admin/users', verifyToken, userController.findUsers);
```
Di atas, kita membuat route baru dengan method `GET` dan untuk endpoint yang digunakan adalah `/admin/users`.

Pada parameter pertama, kita panggil middleware `verifyToken`, ini bertujuan untuk memerika ke-valid-an token. Dan parameter kedua kita panggil function `findUsers` yang ada di dalam controller.

## Langkah 3 - Uji Coba Get Data users

Silahkan buka aplikasi Postman dan masukkan URL berikut ini `http://localhost:3000/api/admin/users` dan untuk method-nya silahkan pilih GET.

Selanjutnya silahkan klik tab `Headers` kemudian masukkan key dan value berikut ini :

| KEY           | VALUE   |
|---------------|---------|
| `Authorization` | Token   |

> silahkan ganti `Token` yang ada pada value dengan token yang di dapatkan saat proses login.

Jika sudah silahkan klik `Send` dan jika berhasil maka kita akan mendapatkan response dalam format JSON yang berisi informasi list data users.

```json
{
    "success": true,
    "message": "Get all users successfully",
    "data": [
        {
            "id": 1,
            "name": "John Doe",
            "email": "admin@gmail.com"
        }
    ]
}
```
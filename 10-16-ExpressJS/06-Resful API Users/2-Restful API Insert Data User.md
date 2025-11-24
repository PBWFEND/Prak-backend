# Membuat Restful API Insert Data User

Setelah berhasil menampilkan list data users dari database, sekarang kita semua akan belajar bagaimana cara membuat proses insert data ke dalam database.

## Langkah 1 - Menambahkan Function createUser di Controller

Silahkan teman-teman buka file `controllers/UserController.js`, kemudian ubah semua kode-nya menjadi seperti berikut ini.

```javascript
//import express
const express = require("express");

//import prisma client
const prisma = require("../prisma/client");

// Import validationResult from express-validator
const { validationResult } = require("express-validator");

//import bcrypt
const bcrypt = require("bcryptjs");

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

//function createUser
const createUser = async (req, res) => {

    // Periksa hasil validasi
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Jika ada error, kembalikan error ke pengguna
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {

        //insert data
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            },
        });

        res.status(201).send({
            success: true,
            message: "User created successfully",
            data: user,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = { findUsers, createUser };
```
Dari perubahan kode di atas, pertama kita import `validationResult` dari Express Validator.

```javascript
// Import validationResult from express-validator
const { validationResult } = require("express-validator");
```
Karena akan menyimpan data password, maka kita perlu mengimport library `bcryptjs`.

```javascript
//import bcrypt
const bcrypt = require("bcryptjs");
```
Setelah itu, kita buat function baru dengan nama `createUser`.

```javascript
//function createUser
const createUser = async (req, res) => {

    // ....
	
}
```
Di dalamnya kita buat variable baru dengan nama `errors` dan berisi `validationResult` yang mana parameternya adalah request dari pengguna.

```javascript
// Periksa hasil validasi
const errors = validationResult(req);
```
Jika variable `errors` di atas tidak kosong, artinya ada validasi yang belum terpenuhi, maka kita akan return ke dalam format JSON dan berisi informasi validasi yang dibutuhkan.

```json
// Jika ada error, kembalikan error ke pengguna
return res.status(422).json({
    success: false,
    message: "Validation error",
    errors: errors.array(),
});
```
Tapi jika request sudah sesuai dengan validasi, maka kita membuat variable baru dengan nama `hashedPassword` dan berisi proses hashing password menggunakan `Bcrypt`.

Setelah itu, kita lakukan proses insert data ke dalam database menggunakan Prisma.

```javascript
//insert data
const user = await prisma.user.create({
    data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    },
});
```
Kemudian kita return ke dalam format JSON dan berisi informasi data user yang berhasil register.

```javascript
res.status(201).send({
    success: true,
    message: "User created successfully",
    data: user,
});
```
Dan jangan lupa untuk export function `createUser`.

```javascript
module.exports = { findUsers, createUser };
```

## Langkah 2 - Membuat Route API Create User

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

//import validate user
const { validateUser } = require('../utils/validators/user');

//define route for register
router.post('/register', validateRegister, registerController.register);

//define route for login
router.post('/login', validateLogin, loginController.login);

//define route for user
router.get('/admin/users', verifyToken, userController.findUsers);

//define route for user create
router.post('/admin/users', verifyToken, validateUser, userController.createUser);

//export router
module.exports = router
```
Dari perubahan kode di atas, pertama kita import helper validator `validateUser`.

```javascript
//import validate user
const { validateUser } = require('../utils/validators/user');
```
Setelah itu, kita buat route baru untuk proses create data user.

```javascript
//define route for user create
router.post('/admin/users', verifyToken, validateUser, userController.createUser);
```
Di atas, kita menambahkan route baru dengan method `POST` dan untuk path / endpoint-nya adalah `/admin/users.`

Pada parameter pertama, kita panggil middleware `verifyToken`, yang artinya akan melewati pengecekan token JWT.

Kemudian pada parameter kedua, kita panggil `validateUser`, yaitu digunakan untuk memvalidasi data / request yang dikirimkan oleh pengguna.

Pada parameter ketiga, kita arahkan ke dalam function `createUser` yang ada di dalam controller `UserController`.

## Langkah 3 - Uji Coba Insert Data User

Silahkan teman-teman buka aplikasi Postman, kemudiaan masukkan URL berikut ini` http://localhost:3000/api/admin/users` dan untuk method-nya silahkan pilih `POST`.

Selanjutnya silahkan klik tab `Headers` kemudian masukkan key dan value berikut ini :

| KEY          | VALUE     |
|--------------|-----------|
| Authorization| Token     |

> silahkan ganti `Token` yang ada pada value dengan token yang di dapatkan saat proses login.

Jika sudah, sekarang klik tab `Body` kemudian pilih `x-www-urlencoded` dan masukkan key dan value berikut ini :

| KEY          | VALUE     |
|--------------|-----------|
| `name`         |   isi nama user sesuai keinginan |
| `email`        |   isi email user sesuai keinginan |
| `password`     |   isi password user sesuai keinginan |

Setelah semua input sudah diisi, sekarang silahkan klik `Send` dan jika berhasil maka kita akan mendapatkan sebuah response dalam format JSON yang berisi informasi data user yang baru saja di insert.

```json
{
    "success": true,
    "message": "User created successfully",
    "data": {
        "id": 2,
        "name": "yysofiyan",
        "email": "yysofiyan@unsap.ac.id",
        "password": "$2a$10$/PHKLhwWDYrbawjtoaA9ne3He5OzfXv9as8IS7gyEDH78ezbV3VVG",
        "createdAt": "2025-11-23T11:29:16.436Z",
        "updatedAt": "2025-11-23T11:29:16.436Z"
    }
}
```
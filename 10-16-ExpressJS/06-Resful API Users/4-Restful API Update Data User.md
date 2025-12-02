# Membuat Restful API Update Data User

Pada materi sebelumnya kita telah belajar bagaimana cara menampilkan detail data user berdasarkan `ID` dan pada materi kali ini, kita akan belajar bagaimana cara membuat proses update data user ke dalam database.

## Langkah 1 - Menambahkan Function updateUser di Controller

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

//function findUserById
const findUserById = async (req, res) => {

    //get ID from params
    const { id } = req.params;

    try {

        //get user by ID
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: `Get user By ID :${id}`,
            data: user,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

//function updateUser
const updateUser = async (req, res) => {

    //get ID from params
    const { id } = req.params;

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

        //update user
        const user = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: 'User updated successfully',
            data: user,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = { findUsers, createUser, findUserById, updateUser };
```
Dari perubahan kode di atas, kita menambahkan function baru dengan nama `updateUser`.

```javascript
//function updateUser
const updateUser = async (req, res) => {

	//...
	
}
```
Di dalamnya, kita lakukan destruct `id` yang diambil dari _request params_.

```javascript
//get ID from params
const { id } = req.params;
```
Kemudian kita buat variable baru dengan nama `errors` dan berisi `validationResult` yang mana parameternya adalah request dari pengguna.

```javascript
// Periksa hasil validasi
const errors = validationResult(req);
```
Jika _variable_ `errors` di atas tidak kosong, artinya ada validasi yang belum terpenuhi, maka kita akan _return_ ke dalam format JSON dan berisi informasi validasi yang dibutuhkan.

```javascript
// Jika ada error, kembalikan error ke pengguna
return res.status(422).json({
    success: false,
    message: "Validation error",
    errors: errors.array(),
});
```
Tapi jika request sudah sesuai dengan validasi, maka kita membuat variable baru dengan nama `hashedPassword` dan berisi proses hashing password menggunakan `Bcrypt`.

```javascript
//hash password
const hashedPassword = await bcrypt.hash(req.body.password, 10);
```
Setelah itu, kita lakukan proses update data ke dalam database menggunakan `Prisma`.

```javascript
 //update user
 const user = await prisma.user.update({
     where: {
        id: Number(id),
     },
     data: {
         name: req.body.name,
         email: req.body.email,
         password: hashedPassword,
     },
 });
```
Kemudian kita return ke dalam format JSON dan berisi informasi data user yang berhasil diperbarui.

```javascript
//send response
res.status(200).send({
    success: true,
    message: 'User updated successfully',
    data: user,
});
```
Dan jangan lupa untuk export function `updateUser`.

```javascript
module.exports = { findUsers, createUser, findUserById, updateUser };
```

## Langkah 2 - Membuat Route API Update User

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

//define route for user by id
router.get('/admin/users/:id', verifyToken, userController.findUserById);

//define route for user update
router.put('/admin/users/:id', verifyToken, validateUser, userController.updateUser);

//export router
module.exports = router
```
Dari perubahan kode di atas, kita menambahkan route baru dengan method `PUT` dan _path_ / endpoint yang digunakan adalah `/admin/users/:id`. 

Dan tentu saja kita menambahkan middleware `verifyToken` dan juga `validateUser` untuk memastikan data yang dikirim sudah sesuai dengan validasi yang telah ditentukan.

## Langkah 3 - Uji Coba Update Data User

Sekarang kita lanjutkan untuk uji coba proses update data user ke dalam database. Silahkan buka aplikasi Postman dan masukkan URL berikut ini http://localhost:3000/api/admin/users/1 dan untuk method-nya silahkan pilih `POST`.

> "Di atas, kita contohkan menggunakan user dengan ID : `1`".

Selanjutnya silahkan klik tab `Headers` kemudian masukkan key dan value berikut ini :

| KEY          | VALUE   |
|--------------|---------|
| Authorization| Token   |

> silahkan ganti `Token` yang ada pada value dengan token yang di dapatkan saat proses login.

Jika sudah, sekarang klik tab `Body` kemudian pilih `x-www-urlencoded` dan masukkan key dan value berikut ini :

| KEY      | VALUE                        |
|----------|------------------------------|
| `name`     | isi nama user sesuai keinginan. |
| `email`    | isi email user sesuai keinginan. |
| `password` | isi password user sesuai keinginan. |

Jika sudah, silahkan klik `Send` dan jika berhasil maka kita akan mendapatkan sebuah response dalam format JSON yang berisi informasi tentang data user yang diupdate.

```json
{
    "success": true,
    "message": "User updated successfully",
    "data": {
        "id": 1,
        "name": "Jh Doe - Edit",
        "email": "admin@gmail.com",
        "password": "$2a$10$GkhB3mIFP2S9DuxZNfG2aeDH5rpnC7mUwvCAYADAnEy6o2GFOBuBO",
        "createdAt": "2025-12-01T02:10:15.735Z",
        "updatedAt": "2025-12-01T06:48:32.652Z"
    }
}

```
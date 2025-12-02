# Membuat Restful API Get Data User By ID

Dalam langkah ini, kita akan belajar bagaimana membuat Restful API untuk mendapatkan data user berdasarkan ID.

Pada materi kali ini, kita semua akan belajar bagaimana cara menampilkan detail data _user_ berdasarkan **ID** yang didapatkan dari parameter URL. Tentu saja kita hanya perlu menambahkan sebuah _function_ baru di dalam _controller_ `UserController`.

## Langkah 1 - Menambahkan Function `findUserById` di Controller

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

module.exports = { findUsers, createUser, findUserById };

```
Dari perubahan kode di atas, kita menambahkan function baru dengan nama `findUserById`.

```javascript
//function findUserById
const findUserById = async (req, res) => {

	//...
	
}
```
Di dalamnya, kita lakukan destruct `id` yang diambil dari request params.

```javascript
//get ID from params
const { id } = req.params;
```
Setelah itu, kita lakukan get detail data user berdasarkan ID menggunakan **Prisma**.

```javascript
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
```
Kemudian kita tinggal return aja ke dalam _format JSON_, yang berisi informasi detail data user by ID.

```javascript
//send response
res.status(200).send({
    success: true,
    message: `Get user By ID :${id}`,
    data: user,
});
```
Dan jangan lupa kita export function `findUserById`-nya.

```javascript
module.exports = { findUsers, createUser, findUserById };
```

## Langkah 2 - Membuat Route API Detail User

Silahkan teman-teman buka file `routes/index.js`, kemudian ubah semua kode-nya menjadi berikut ini.

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

//export router
module.exports = router
```

Dari perubahan kode di atas, kita menambahkan route baru dengan method `GET` dan `path` / `endpoint` yang digunakan adalah `/admin/users/:id`.

```javascript
//define route for user by id
router.get('/admin/users/:id', verifyToken, userController.findUserById);
```
Dan kita tambahkan juga middleware `verifyToken` untuk memastikan route tersebut diakses menggunakan token dari JWT.

## Langkah 3 - Uji Coba Menampilkan Detail User

Silahkan teman-teman buka aplikasi Postman dan masukkan URL berikut ini `http://localhost:3000/api/admin/users/1` dan untuk method-nya silahkan pilih `GET`.
Kemudian klik tombol `Send` dan lihat hasilnya.

> "di atas, kita contohkan menggunakan user dengan ID : `1`."

Selanjutnya silahkan klik tab `Headers` kemudian masukkan _key_ dan _value_ berikut ini :

| Key          | Value         |
|--------------|---------------|
| `Authorization`| Bearer `token`|

Jika sudah, silahkan klik `Send` dan jika berhasil maka kita akan mendapatkan sebuah response dalam format `JSON` yang berisi informasi detail data user.

```json
{
    "success": true,
    "message": "Get user By ID :1",
    "data": {
        "id": 1,
        "name": "John Doe",
        "email": "admin@gmail.com"
    }
}
```
Jika hasilnya seperti di atas, maka berarti kita sudah berhasil membuat Restful API untuk mendapatkan detail data user berdasarkan ID.

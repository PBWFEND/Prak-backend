# Membuat Restful API Delete Data User

Pada materi ini kita akan belajar bagaimana cara membuat proses delete data dari database di _Express_ menggunakan _Prisma_. Pada dasarnya konsepnya hampir sama dengan yang menampilkan data berdasarkan ID, bedanya ada pada query-nya, yaitu kita melakukan proses delete.

## Langkah 1 - Menambahkan Function `deleteUser` di Controller

Silahkan teman-teman buka file `controllers/UserController`.js, kemudian ubah semua kode-nya menjadi seperti berikut ini.

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

//function deleteUser
const deleteUser = async (req, res) => {

    //get ID from params
    const { id } = req.params;

    try {

        //delete user
        await prisma.user.delete({
            where: {
                id: Number(id),
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: 'User deleted successfully',
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }

};

module.exports = { findUsers, createUser, findUserById, updateUser, deleteUser };
```
Dari perubahan kode di atas, kita menambahkan function baru dengan nama `deleteUser`.

```javascript
//function deleteUser
const deleteUser = async (req, res) => {

	//...
	
}

```
Di dalamnya, pertama kita lakukan destruct `id` yang ada di dalam request parameter.

```javascript
//get ID from params
const { id } = req.params;
```

Setelah itu, kita lakukan delete data menggunakan Prisma berdasarkan ID user.

```javascript
//delete user
await prisma.user.delete({
    where: {
        id: Number(id),
    },
});
```
Dan kita lakukan return ke dalam format JSON dengan memberikan informasi bahwa data user berhasil dihapus.

```javascript
//send response
res.status(200).send({
    success: true,
    message: 'User deleted successfully',
});

```
## Langkah 2 - Membuat Route API Delete User

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

//define route for user delete
router.delete('/admin/users/:id', verifyToken, userController.deleteUser);

//export router
module.exports = router
```
Dari perubahan kode di atas, kita menambahkan route baru dengan method `DELETE` dan _path / endpoint_ yang digunakan adalah `/admin/users/:id.` Dan kita tambahkan juga _middleware_ `verifyToken`.

## Langkah 3 - Uji Coba Delete Data User

Sekarang kita lanjutkan untuk melakukan proses hapus data, silahkan buka aplikasi *Postman* kemudian masukkan URL berikut ini http://localhost:3000/api/admin/users/2 dan untuk method-nya silahkan pilih `DELETE`.

> di atas, kita contohkan menggunakan user dengan ID :` 2.`

Selanjutnya silahkan klik tab `Headers` kemudian masukkan key dan value berikut ini :

| KEY           | VALUE     |
| ------------- | --------- |
| `Authorization` | Token     |

> silahkan ganti Token yang ada pada value dengan `token` yang di dapatkan saat proses login.

Jika sudah, silahkan klik `Send` dan jika berhasil maka kita akan mendapatkan sebuah response dalam format JSON yang berisi informasi data user telah berhasil dihapus.

```json
{
    "success": true,
    "message": "User deleted successfully"
}
```

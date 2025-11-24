# Membuat Restful API untuk Login

Setelah berhasil membuat proses register, maka kita akan lanjutkan belajar bagaimana membuat proses login. Dimana pada proses login ini kita nanti akan belajar men-generate token JWT, yang mana token tersebut bisa kita gunakan untuk mengakses endpoint-endpoint yang membutuhkan otentikasi.

## Langkah 1 - Membuat Contorller Login

Silahkan teman-teman buat file baru dengan nama `LoginController.js` di dalam folder `controllers`, kemudian masukkan kode berikut ini di dalamnya.

```javascript
//import express
const express = require("express");

// Import validationResult from express-validator
const { validationResult } = require("express-validator");

//import bcrypt
const bcrypt = require("bcryptjs");

//import jsonwebtoken
const jwt = require("jsonwebtoken");

//import prisma client
const prisma = require("../prisma/client");

//function login
const login = async (req, res) => {
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

    try {

        //find user
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            },
        });

        //user not found
        if (!user)
            return res.status(404).json({
                success: false,
                message: "User not found",
            });

        //compare password
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        //password incorrect
        if (!validPassword)
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });

        //generate token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Destructure to remove password from user object
        const { password, ...userWithoutPassword } = user;

        //return response
        res.status(200).send({
            success: true,
            message: "Login successfully",
            data: {
                user: userWithoutPassword,
                token: token,
            },
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = { login };
```
Dari penambahan kode di atas, pertama kita import Express.

```javascript
//import express
const express = require("express");
```
Setalah itu, kita import `validationResult` dari Express `Validator`.

```javascript
// Import validationResult from express-validator
const { validationResult } = require("express-validator");
```
Kemudian kita import library `Bcrypt`, `JWT` dan `Prisma Client`.

```javascript
//import bcrypt
const bcrypt = require("bcryptjs");

//import jsonwebtoken
const jwt = require("jsonwebtoken");

//import prisma client
const prisma = require("../prisma/client");
```
Selanjutnya, kita buat function baru dengan nama login.

```javascript
//function login
const login = async (req, res) => {
};
```
Di dalamnya kita buat variable baru dengan nama errors dan berisi validationResult yang mana parameternya adalah request dari pengguna.

```javascript
// Periksa hasil validasi
const errors = validationResult(req);
```
Jika variable `errors` di atas tidak kosong, artinya ada validasi yang belum terpenuhi, maka kita akan return ke dalam format JSON dan berisi informasi validasi yang dibutuhkan.

```javascript
// Jika ada error, kembalikan error ke pengguna
return res.status(422).json({
    success: false,
    message: "Validation error",
    errors: errors.array(),
});
```
Jika request yang dikirimkan sudah sesuai, maka kita akan lanjutkan mencari data user berdasarkan `email` menggunakan Prisma.

```javascript
//find user
const user = await prisma.user.findFirst({
    where: {
        email: req.body.email,
    },
    select: {
        id: true,
        name: true,
        email: true,
        password: true,
    },
});
```
Jika data user tidak ditemukan, maka kita akan return dalam format JSON, yang berisi informasi data user tidak ada.

```javascript
//user not found
if (!user)
    return res.status(404).json({
        success: false,
        message: "User not found",
    });
```
Tapi jika data user ditemukan, maka langkah selanjutnya adalah melakukan compare password menggunakan Bcrypt, yaitu password yang ada di dalam request dengan password yang ada di dalam database.

```javascript
//compare password
const validPassword = await bcrypt.compare(
    req.body.password,
    user.password
);
```
Jika proses compare password bernilai `false`, maka kita akan return ke dalam format JSON, yang berisi informasi password salah.

```javascript
//password incorrect
if (!validPassword)
    return res.status(401).json({
        success: false,
        message: "Invalid password",
    });
```
Tapi jika passwordnya benar, maka kita akan lakukan generate token JWT.

```javascript
//generate token JWT
const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
});
```
Dan kita lakukan destruct `password` agar tidak ditampilkan pada response JSON.

```javascript
// Destructure to remove password from user object
const { password, ...userWithoutPassword } = user;
```
Setelah itu, baru kita lakukan return dalam format JSON yang berisi informasi login berhasil dan informasi data user beserta token JWT-nya.

```javascript
//return response
res.status(200).send({
    success: true,
    message: "Login successfully",
    data: {
        user: userWithoutPassword,
        token: token,
    },
});
```
# Langkah 2 - Membuat Route API Login

Kita lanjutkan untuk membuat route API login-nya. Silahkan teman-teman buka file `routes/index.js`, kemudian ubah semua kode-nya menjadi seperti berikut ini.

```javascript
//import express
const express = require('express')

//init express router
const router = express.Router();

//import register controller
const registerController = require('../controllers/RegisterController');

//import login controller
const loginController = require('../controllers/LoginConroller');

//import validate register and login
const { validateRegister, validateLogin } = require('../utils/validators/auth');

//define route for register
router.post('/register', validateRegister, registerController.register);

//define route for login
router.post('/login', validateLogin, loginController.login);

//export router
module.exports = router
```

Dari perubahan kode di atas, pertama kita import `LoginController`.

```javascript
//import login controller
const loginController = require('../controllers/LoginConroller');
```
Kemudian kita destruct `validateLogin` dari helper validator auth.

```javascript
//import validate register and login
const { 
    validateRegister, 
    validateLogin       // <-- destruct "validateLogin"
    
} = require('../utils/validators/auth');
```
Setelah itu, kita buat route untuk API login-nya.

```javascript
//define route for login
router.post('/login', validateLogin, loginController.login);
```
Di atas, kita membuat route baru dengan method `POST` dan untuk endpoint-nya adalah /login.

Setelah itu pada parameter pertama kita berikan `validateLogin`, artinya data sebelum dikirim ke controller akan diperika terlebih dahulu oleh validasi. Kemudian untuk parameter kedua adalah controller login yang sudah kita buat sebelumnya.

## Langkah 3 - Uji Coba Proses Login

Silahkan teman-teman buka aplikasi Postman, kemudian masukkan URL berikut ini `http://localhost:3000/api/login` dan untuk method-nya silahkan pilih `POST`.

Setelah itu, masuk di tab `Body` dan pilih `x-www-form-urlencoded`, kemudian masukkan key dan value berikut ini.

| Key          | Value         |
|--------------|---------------|
| email        | `admin@gmail.com`|
| password     | `password`   |

Jika sudah, silahkan klik `Send` dan jika berhasil maka kita akan mendapatkan response JSON yang kurang lebih seperti berikut ini.

```json
{
    "success": true,
    "message": "Login successfully",
    "data": {
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "admin@gmail.com"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE2Nzc4NDg3LCJleHAiOjE3MTY3ODIwODd9.Fzr9LS9UpqWvM-OHY4uVNOjftJZpkBbu8fOUv5Y8jZ4"
    }
}
```

Di atas, kita telah berhasil melakukan proses login dan bisa teman-teman lihat pada response JSON-nya terdapat token, dimana token tersebut akan berubah-ubah saat proses login dan token tersebut akan digunakan untuk mengakses endpoint-endpoint yang membutuhkan proses otentikasi.


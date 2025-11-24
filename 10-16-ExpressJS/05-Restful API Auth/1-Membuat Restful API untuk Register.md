# Membuat Restful API untuk Register

Sekarang kita akan lanjutkan belajar bagaimana cara membuat Rest API untuk proses register, disini sebelumnya kita akan menambahkan 1 library lagi yang bernama `Bcrypt`. Library ini akan kita gunakan untuk melakukan hash terhadap password yang dimiliki user.

## Langkah 1 - Installasi Library Bcrypt

Silahkan teman-teman masuk ke dalam folder project, kemudian jalankan perintah berikut ini di dalam terminal/CMD.

```bash
npm install bcrypt
```
Silahkan tunggu proses installasinya selesai dan pastikan terhubung dengan internet.

## Langkah 2 - Membuat Controller untuk Register

Sekarang silahkan teman-teman buat folder baru dengan nama `controllers` dan di dalam folder tersebut silahkan buat file baru dengan nama `RegisterController.js`, kemudian masukkan kode berikut ini di dalamnya.

```javascript
//import express
const express = require("express");

// Import validationResult from express-validator
const { validationResult } = require("express-validator");

//import bcrypt
const bcrypt = require("bcryptjs");

//import prisma client
const prisma = require("../prisma/client");

//function register
const register = async (req, res) => {

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

        //return response json
        res.status(201).send({
            success: true,
            message: "Register successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = {register};
```
Dari penambahan kode di atas, pertama kita import Express.

```javascript
//import express
const express = require("express");
```
Setelah itu, kita import `validationResult` dari Express Validator.

```javascript
// Import validationResult from express-validator
const { validationResult } = require("express-validator");
```
Kemudian kita import library `bcrypt` dan Prisma Client.

```javascript
//import bcrypt
const bcrypt = require("bcryptjs");

//import prisma client
const prisma = require("../prisma/client");
```
Selanjutnya, kita buat function baru dengan nama `register`.

```javascript
//function register
const register = async (req, res) => {

	//...
	
}
```

Di dalamnya kita buat variable baru dengan nama `errors` dan berisi `validationResult` yang mana parameternya adalah _request_ dari pengguna.

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
Tapi jika request sudah sesuai dengan validasi, maka kita membuat variable baru dengan nama `hashedPassword` dan berisi proses hashing password menggunakan Bcrypt.

```javascript
//hash password
const hashedPassword = await bcrypt.hash(req.body.password, 10);
```
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
//return response json
res.status(201).send({
    success: true,
    message: "Register successfully",
    data: user,
});
```

## Langkah 3 - Membuat Route API Register

Setelah berhasil membuat controller untuk proses register, maka kita akan lanjutkan membuat route untuk API rergister-nya.

Silahkan teman-teman buat folder baru dengan nama `routes` dan di dalamnya silahkan buat file baru dengan nama `index.js`, kemudian masukkan kode berikut ini di dalamnya.

```javascript
//import express
const express = require('express')

//init express router
const router = express.Router();

//import register controller
const registerController = require('../controllers/RegisterController');

//import validate register
const { validateRegister } = require('../utils/validators/auth');

//define route for register
router.post('/register', validateRegister, registerController.register);

//export router
module.exports = router
```
Dari penambahan kode di atas, pertama kita import Express.

```javascript
//import express
const express = require('express')
```
Setelah itu, kita inisialisasi router menggunakan Express.

```javascript
//init express router
const router = express.Router();
```
kemudian kita import RegisterController yang sudah kita buat sebelumnya.

```javascript
//import register controller
const registerController = require('../controllers/RegisterController');
```
Dan kita juga import helper validator yang bernama `validateRegister`.

```javascript
const { validateRegister } = require('../utils/validators/auth');
```
Setelah itu, kita tinggal define route untuk register.

```javascript
//define route for register
router.post('/register', validateRegister, registerController.register);
```
Di atas, kita membuat route baru dengan method `POST` dan untuk endpoint-nya adalah `/register`.

Setelah itu pada parameter pertama kita berikan `validateRegister`, artinya data sebelum dikirim ke controller akan diperika terlebih dahulu oleh validasi. Kemudian untuk parameter kedua adalah controller register yang sudah kita buat sebelumnya.

## Langkah 4 - Mendaftarkan Route

Agar route di atas bisa digunakan di dalam aplikasi, maka kita akan memanggilnya di dalam main file Express kita. Silahkan teman-teman buka file `index.js`, kemudian ubah kode-nya menjadi seperti berikut ini.

```javascript
//import express
const express = require('express')

//import CORS
const cors = require('cors')

//import bodyParser
const bodyParser = require('body-parser')

//import router
const router = require('./routes')

//init app
const app = express()

//use cors
app.use(cors())

//use body parser
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//define port
const port = 3000;

//route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//define routes
app.use('/api', router);

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
```
Dari perubahan kode di atas, pertama kita import file router kita.

```javascript
//import router
const router = require('./routes')
```
Setelah itu, kita register di dalam Express menggunakan keyword use.

```javascript
//define routes
app.use('/api', router);
```
Di atas, kita berikan basePath untuk endpoint-nya, yaitu `/api`. Artinya nanti semua URL akan ditambahkan `/api` di depannya.

## Langkah 5 - Uji Coba Proses Register

Silahkan teman-teman uji coba proses register dengan menggunakan tool Postman atau cURL. Pastikan untuk mengirim data dengan format JSON dan berisi nama, email, dan password.

kemudian masukkan URL berikut ini http://localhost:3000/api/register dan untuk method-nya silahkan pilih `POST`.

Setelah itu, masuk di tab `Body` dan pilih `x-www-form-urlencoded`, kemudian masukkan key dan value berikut ini.

| KEY      | VALUE           |
|----------|-----------------|
| name     | John Doe        |
| email    | admin@gmail.com |
| password | password        |

Jika sudah, silahkan klik `Send` dan jika berhasil maka kita akan mendapatkan response JSON yang kurang lebih seperti berikut ini.

```json
{
    "success": true,
    "message": "Register successfully",
    "data": {
        "id": 1,
        "name": "John Doe",
        "email": "admin@gmail.com",
        "password": "$2a$10$L6UAeDnLXTr3VLtJCtGGcu975tbK7ifv3E0PMRg8GUZ6ASc6wn7uu",
        "createdAt": "2025-11-20T02:10:15.735Z",
        "updatedAt": "2025-11-20T02:10:15.735Z"
    }
}
```
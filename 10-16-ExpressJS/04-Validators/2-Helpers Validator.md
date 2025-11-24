# Membuat Helpers Validator

Setelah berhasil menginstall library Express Validator, maka sekarang kita akan lanjutkan belajar membuat helpers yang nanti digunakan di dalam form. Disini kita akan membuat 2 file helper, yaitu untuk validasi berikut ini.

1. `auth` - meliputi proses register dan login.
2. `user` - untuk proses CRUD data user, meliputi create dan update data.

## Langkah 1 - Membuat Helpers Validator Auth

Silahkan teman-teman buat folder baru dengan nama `utils`, kemudian di dalamnya silahkan buat folder baru lagi dengan nama `validators` dan di dalam folder tersebut silahkan buat file baru dengan nama `auth.js`, kemudian masukkan kode berikut ini.

```javascript
//import express validator
const { body } = require('express-validator');

//import prisma
const prisma = require('../../prisma/client');

// Definisikan validasi untuk register
const validateRegister = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is invalid')
        .custom(async (value) => {
            if (!value) {
                throw new Error('Email is required');
            }
            const user = await prisma.user.findUnique({ where: { email: value } });
            if (user) {
                throw new Error('Email already exists');
            }
            return true;
        }),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

//definisikan validasi untuk login
const validateLogin = [
    body('email').notEmpty().withMessage('Email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

module.exports = { validateRegister, validateLogin };
```

Dari penambahan kode di atas, pertama kita import `body` dari Express Validator.

```javascript
//import express validator
const { body } = require('express-validator');
```
Kemudian kita import Prisma Client.

```javascript
//import prisma
const prisma = require('../../prisma/client');
```

Setelah itu, kita buat 2 function, yaitu :

1. `validateRegister` - untuk memvalidasi proses register. Di dalam function ini, kita membuat beberapa definisi validasi, yaitu :

| Key      | Validation | Description                              |
|----------|------------|------------------------------------------|
| name     | notEmpty   | Kolom wajib diisi.                       |
| email    | notEmpty   | Kolom wajib diisi.                       |
|     | isEmail    | Kolom wajib memiliki format email.       |
|     | custom     | Untuk memeriksa Unique menggunakan Prisma. |
| password | isLength   | Kolom minimal 6 karakter.                |

2. `validateLogin` - untuk memvalidasi proses login. Di dalam function ini, kita membuat beberapa definisi validasi, yaitu :

| Key      | Validation | Description                              |
|----------|------------|------------------------------------------|
| email    | notEmpty   | Kolom wajib diisi.                       |
| password | isLength   | Kolom minimal 6 karakter.                |

## Langkah 2 - Membuat Helpers Validator User

Sekarang kita akan lanjutkan membuat helpers validasi lagi untuk user, validasi ini nantinya akan kita gunakan untuk proses create dan update data user.

Silahkan buat file baru dengan nama `user.js` di dalam folder `utils/validators`, kemudian masukkan kode berikut ini di dalamnya.

```javascript
//import express validator
const { body } = require('express-validator');

//import prisma
const prisma = require('../../prisma/client');

// Definisikan validasi untuk create user
const validateUser = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is invalid')
        .custom(async (value, { req }) => {
            if (!value) {
                throw new Error('Email is required');
            }
            const user = await prisma.user.findUnique({ where: { email: value } });
            if (user && user.id !== Number(req.params.id)) {
                throw new Error('Email already exists');
            }
            return true;
        }),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

module.exports = { validateUser }
```
Untuk penjelasan kode-nya hampir sama dengan yang di function `validateRegister`.


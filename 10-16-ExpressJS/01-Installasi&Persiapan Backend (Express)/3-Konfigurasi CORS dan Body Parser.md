# Konfigurasi CORS dan Body Parser

`CORS` (_Cross-Origin Resource Sharing_) adalah teknik yang memungkinkan browser dari satu domain untuk mengakses sumber daya dari domain lain melalui permintaan `HTTP`. 

Di sini, kita akan mengonfigurasi `CORS` agar `RESTful API` yang kita buat dapat diakses oleh aplikasi eksternal seperti aplikasi Android atau frontend.

## Langkah 1: Instalasi dan Konfigurasi CORS

Untuk menangani CORS dalam proyek Express, kita akan menggunakan pustaka tambahan. Jalankan perintah berikut di terminal/CMD Anda:
    
```bash
npm install cors@2.8.5 --save

```

```bash
// output
yysofiyan @ Midnight: ~/Desktop/untitled folder 3/express/backend-express                      
$ npm install cors@2.8.5 --save

added 2 packages, and audited 71 packages in 744ms

16 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Setelah instalasi berhasil, lakukan konfigurasi pada file `index.js` sebagai berikut:

```javascript
// Import express
const express = require('express');

// Import CORS
const cors = require('cors');

// Inisialisasi aplikasi
const app = express();

// Gunakan CORS
app.use(cors());

// Definisikan port
const port = 3000;

// Route dasar
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Mulai server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
```

**Penjelasan Kode:**

- Pertama-tama kita mengimpor pustaka CORS:
  
```javascript
  const cors = require('cors');
  ```

- Kemudian menerapkannya ke aplikasi Express dengan menggunakan `use`.
  
  ```javascript
  app.use(cors());
  ```

## Langkah 2: Instalasi dan Konfigurasi Body Parser

`Body Parser` merupakan library yang berisi `middleware` yang membaca data dari permintaan HTTP dan menyimpannya sebagai objek JavaScript yang dapat diakses melalui `req.body`.

Jalankan perintah berikut untuk menginstal Body Parser:

```bash
npm install body-parser@1.20.0 --save
```
Lanjutkan dengan memperbarui file `index.js`:

```javascript
// Import express
const express = require('express');

// Import CORS
const cors = require('cors');

// Import body parser
const bodyParser = require('body-parser');

// Inisialisasi aplikasi
const app = express();

// Gunakan CORS
app.use(cors());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Definisikan port
const port = 3000;

// Route dasar
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Mulai server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
```

**Penjelasan Kode:**

Dari perubahan kode di atas, pertama kita melakukan _import library_ **Body Parser** terlebih dahulu.

```javascript
// Import body parser
const bodyParser = require('body-parser')
```
Setelah itu, kita meggunakan keyword `use` untuk melakukan _assign_ _library_ tersebut ke dalam project Express.

```javascript
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
```
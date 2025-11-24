# Persiapan dan Tools Pendukung

Sebelum kita memulai mengembangkan website atau aplikasi, kita memerlukan beberapa tools pendukung seperti text editor, database, Node.js, browser, dan lain-lain. Berikut adalah langkah-langkah persiapan yang diperlukan:

## Langkah 1 - Installasi Text Editor

Terdapat banyak pilihan text editor yang dapat digunakan dalam pengembangan aplikasi. Namun, untuk panduan ini kami merekomendasikan text editor yang populer dan memiliki dukungan ekstensi yang luas.

### Visual Studio Code

Visual Studio Code merupakan text editor buatan Microsoft yang sangat populer di kalangan pengembang karena kemudahan penggunaannya dan dukungan untuk berbagai bahasa pemrograman.

**Cara Installasi:**
- Bagi teman-teman yang belum memiliki VS Code, silakan unduh melalui link berikut: [https://code.visualstudio.com/](https://code.visualstudio.com/)
- Sesuaikan dengan sistem operasi yang Anda gunakan

### Plugin Visual Studio Code untuk JavaScript dan React

Setelah VS Code terinstal, pasang beberapa ekstensi berikut yang akan sangat membantu dalam proses pengembangan:

1. [Babel JavaScript](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel)
2. [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)
3. [ES6 String HTML](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html)
4. [ES7 React/Redux/GraphQL/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
5. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
6. [JavaScript (ES6) code snippets](https://marketplace.visualstudio.com/items?itemName=skyran.js-jsx-snippets)
7. [React Snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets)

## Langkah 2 - Installasi Node.js

Karena kita akan bekerja dengan framework JavaScript, maka Node.js diperlukan. Proses instalasinya pun cukup mudah.

### Rekomendasi Versi

Kami menyarankan menggunakan versi LTS (Long Term Support), yaitu versi 20.x LTS.

**Cara Installasi:**
- Kunjungi situs resmi Node.js: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- Unduh versi yang sesuai dengan sistem operasi Anda

### Verifikasi Instalasi

Untuk memastikan Node.js telah berhasil diinstal, jalankan perintah berikut di terminal/CMD:

```bash
node --version
```
```bash
npm --version
```

```bash
// output
yysofiyan @ Midnight: ~/Desktop/untitled folder 3/express/backend-express                      
$ node --version
v23.5.0
_______________________________________________________________________________________________
yysofiyan @ Midnight: ~/Desktop/untitled folder 3/express/backend-express                      
$ npm --version 
10.9.2
```
Jika muncul nomor versi, maka berarti Node.js telah berhasil diinstal.

## Langkah 3 - Installasi Browser (Google Chrome)

Disini saya merekomendasikan menggunakan browser Google Chrome. Untuk installasinya, silahkan teman-teman buka link berikut ini:  
[https://www.google.com/chrome/](https://www.google.com/chrome/)

## Langkah 4 - Installasi Database

Untuk database, kita nanti akan menggunakan MySQL. 

Atau juga bisa menggunakan yang ada di dalam XAMPP/Laragon/ServBay, karena di dalamnya sudah tersedia phpMyAdmin yang akan mempermudah teman-teman dalam mengelola database MySQL.

## (Optional)

Alternatif lain untuk keperluan `development` dan `deployment`:

- **Railway** (Platform Cloud): [https://railway.com/](https://railway.com/)  
- **Heroku** (Platform as a Service): [https://www.heroku.com/](https://www.heroku.com/)  
- **Supabase** (Backend as a Service): [https://supabase.com/](https://supabase.com/)  
- **Netlify** (Deployment Platform): [https://www.netlify.com/](https://www.netlify.com/)
- **Vercel** (Deployment Platform): [https://vercel.com/](https://vercel.com/)
- **Render** (Deployment Platform): [https://render.com/](https://render.com/)

## Langkah 5 - Installasi Postman

Postman adalah aplikasi yang akan kita gunakan untuk melakukan uji coba REST API nanti. Untuk melakukan instalasi, silahkan teman-teman unduh melalui situs resminya di:  
[https://www.postman.com/downloads/](https://www.postman.com/downloads/)

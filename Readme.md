# USA-WP2360225 - Pemrograman Web Backend

![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=nodedotjs&logoColor=white)
![Framework](https://img.shields.io/badge/Framework-Express.js-000000?logo=express&logoColor=white)
![Semester](https://img.shields.io/badge/Semester-2026%2F2027%20Gasal-blue)
![Pertemuan](https://img.shields.io/badge/Pertemuan-16%20Minggu-purple)

Mata kuliah **Pemrograman Berbasis Web Back End** menggunakan **JavaScript + Node.js** dengan framework **Express.js** (3 SKS, Semester V, Program Studi Sistem Informasi). Mahasiswa membangun fondasi pemahaman backend — arsitektur client–server, HTTP, REST, dan JSON — dilanjutkan JavaScript modern, Node.js fundamentals, Express.js, database & ORM (Prisma), JWT, security, hingga membangun **RESTful API** lengkap dengan testing, dokumentasi, dan deployment.

## Daftar Isi

| No. | Dokumen | Deskripsi |
| :-: | ------- | --------- |
| 01 | [Timeline Pertemuan — `Timeline.md`](./Timeline.md) | Rencana 16 pertemuan Pemrograman Web Backend — Semester 2026/2027 Gasal: CPMK, materi, aktivitas, output/asesmen |
| 02 | [Milestone — `Milestone.md`](./Milestone.md) | Peta fase pembelajaran: Fondasi, API Core, Security & Reliability, Quality & Delivery, hingga UAS |
| 03 | [Pertemuan 1 — `pertemuan-01/01-Pertemuan-1.md`](./pertemuan-01/01-Pertemuan-1.md) | Orientasi Backend Web, Client–Server, HTTP, REST & JSON — dilengkapi diagram Mermaid, demo server Node.js, CBL API Perpustakaan, kuis, dan Tugas 1 + rubrik |
| 04 | Kode praktikum Pertemuan 1 — [`code/pertemuan-01/`](./code/pertemuan-01/) | Contoh kode siap jalan: `server.js` (demo HTTP server), `latihan.js` (kerangka TODO terbimbing), `perpustakaan.js` (implementasi referensi CBL) |
| 05 | Kode praktikum Pertemuan 2 — [`code/pertemuan-02/`](./code/pertemuan-02/) | `demo-es6.js`, `demo-async.js`, `service-buku.js` (CBL), `latihan.js` (TODO terbimbing), `modul-02.js`, `data.txt` |
| 06 | [Pertemuan 3 — `pertemuan-03/03-Pertemuan-3.md`](./pertemuan-03/03-Pertemuan-3.md) | Node.js Fundamentals — runtime, module ESM, npm, filesystem, environment variable, HTTP server, CBL, kuis, dan Tugas 2 |
| 07 | Kode praktikum Pertemuan 3 — [`code/pertemuan-03/`](./code/pertemuan-03/) | `config.js`, `demo-node.js`, `server.js`, dan `latihan.js` — seluruhnya menggunakan Node.js 20+ tanpa dependency eksternal |

## Referensi Terkait

### 01-Pertemuan-1.md — Orientasi Backend, Client–Server, HTTP, REST & JSON

- [MDN — An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview) — konsep dasar HTTP: request, response, dan siklusnya
- [MDN — HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) — GET, POST, PUT, PATCH, DELETE, dan sifat *safe*/idempotent
- [MDN — HTTP Status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) — daftar lengkap status code dan keluarga 1xx–5xx
- [RESTful API Tutorial](https://restfulapi.net/) — prinsip REST, resource naming, dan desain endpoint
- [MDN — Working with JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) — sintaks JSON serta `JSON.stringify()` / `JSON.parse()`
- [Node.js — HTTP module](https://nodejs.org/docs/latest/api/http.html) — dokumentasi resmi `http.createServer()` yang dipakai pada demo
- [Postman Learning Center](https://learning.postman.com/docs/) — menguji endpoint demo (GET/POST) secara visual

### 02-Pertemuan-2.md — JavaScript Modern untuk Backend

- [MDN — Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) — object/array destructuring, default, dan rename
- [MDN — Spread syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) — spread operator dan rest parameter
- [MDN — Array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) — `map`, `filter`, `find`, `reduce`, dan kawan-kawan
- [MDN — Optional chaining (?.)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) dan [Nullish coalescing (??)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) — akses data aman
- [MDN — Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) — keadaan pending/fulfilled/rejected, `then`/`catch`/`finally`
- [MDN — async function & await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) — aturan main async/await dan try/catch
- [Node.js — File system (fs/promises)](https://nodejs.org/docs/latest/api/fs.html) — baca/tulis file berbasis Promise yang dipakai pada demo
- [javascript.info — Event loop](https://javascript.info/event-loop) — animasi dan penjelasan urutan eksekusi sync/async

### 03-Pertemuan-3.md — Node.js Fundamentals

- [Node.js — Introduction to Node.js](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs) — runtime JavaScript dan penggunaan Node.js
- [Node.js — Modules: ECMAScript modules](https://nodejs.org/api/esm.html) — `import`, `export`, dan module ESM
- [Node.js — File system](https://nodejs.org/api/fs.html) — operasi filesystem dan `node:fs/promises`
- [Node.js — HTTP](https://nodejs.org/api/http.html) — pembuatan HTTP server dengan module bawaan
- [npm — package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json) — metadata project, script, dan dependency

### Timeline.md — Materi 16 Pertemuan

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) — panduan resmi JavaScript: ES6+, object, async/await (Minggu 2)
- [Node.js Official Documentation](https://nodejs.org/en/docs/) — runtime, npm, module system, filesystem (Minggu 3)
- [Express.js Official Documentation](https://expressjs.com/en/api.html) — routing, middleware, request/response (Minggu 4–7)
- [Prisma ORM Documentation](https://www.prisma.io/docs) — setup, schema, migration, dan Prisma Client (Minggu 6–7)
- [JSON Web Token (JWT)](https://jwt.io/) — konsep token dan library `jsonwebtoken` (Minggu 9–10)
- [OWASP API Security Top 10](https://owasp.org/API-Security/) — keamanan API: validation, injection, auth (Minggu 11)
- [Postman Learning Center](https://learning.postman.com/docs/) — testing & dokumentasi endpoint API (Minggu 13–14)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) — standar dokumentasi API / Swagger (Minggu 14)

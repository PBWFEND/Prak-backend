# 🎯 Milestone – Pemrograman Web Backend (16 Pertemuan)

Milestone disusun berdasarkan `Timeline.md`, dikelompokkan per capaian CPMK dengan penanda UTS dan UAS. Tanggal target disesuaikan untuk dua kelas, yaitu SI-VA yang mulai pada 14 September 2026 dan SI-VB yang mulai pada 15 September 2026. Estimasi dapat berubah sesuai jadwal kampus.

## Ringkasan Milestone

| Milestone | Fase | Periode | Kelas | Target Selesai | CPMK | Deliverable Utama |
| --------- | ---- | ------- | ----- | -------------- | ---- | ----------------- |
| M1 | Fondasi Backend | Minggu 1–3 | SI-VA / SI-VB | **28 Sep 2026 / 29 Sep 2026** | CPMK115 | Peta arsitektur backend, latihan JavaScript, HTTP server Node.js |
| M2 | REST API & Database | Minggu 4–7 | SI-VA / SI-VB | **26 Okt 2026 / 27 Okt 2026** | CPMK117 | REST endpoint Express.js, schema database, CRUD API terintegrasi |
| M3 | UTS – Mini Project | Minggu 8 | SI-VA / SI-VB | **02 Nov 2026 / 03 Nov 2026** | CPMK117 | Mini project backend (REST API + database) + presentasi |
| M4 | Keamanan & Keandalan | Minggu 9–12 | SI-VA / SI-VB | **30 Nov 2026 / 01 Des 2026** | CPMK118 | Register/login, protected API, security checklist, error handler + logger |
| M5 | Quality & Delivery | Minggu 13–15 | SI-VA / SI-VB | **21 Des 2026 / 22 Des 2026** | CPMK118 | Test suite, dokumentasi API, backend siap deploy |
| M6 | UAS – Final Project | Minggu 16 | SI-VA / SI-VB | **28 Des 2026 / 29 Des 2026** | CPMK118 | Final project backend + presentasi |

---

## M1 — Fondasi Backend (CPMK115)

**Periode:**
- SI-VA: 14 Sep – 28 Sep 2026 (Minggu 1–3)
- SI-VB: 15 Sep – 29 Sep 2026 (Minggu 1–3)

**Tujuan:** Mahasiswa mampu memahami arsitektur client–server serta HTTP/REST, menguasai JavaScript modern untuk backend, dan membangun HTTP server sederhana dengan Node.js.

### Deliverables
- [ ] Peta arsitektur backend + latihan request/response (Minggu 1)
- [ ] Latihan JavaScript backend-oriented (Minggu 2)
- [ ] Project Node.js dan HTTP server sederhana (Minggu 3)

### Kriteria Selesai
- Alur request–response dan konsep HTTP method, status code, serta JSON dapat dijelaskan.
- Latihan JavaScript (module, async/await, Promise) berjalan tanpa error.
- HTTP server sederhana dijalankan dengan Node.js tanpa error.

---

## M2 — REST API & Database (CPMK117)

**Periode:**
- SI-VA: 05 Okt – 26 Okt 2026 (Minggu 4–7)
- SI-VB: 06 Okt – 27 Okt 2026 (Minggu 4–7)

**Tujuan:** Mahasiswa mampu membangun REST API dengan Express.js, mengelola database melalui ORM, dan mengimplementasikan CRUD API yang terintegrasi database.

### Deliverables
- [ ] REST endpoint sederhana dengan Express.js (routing, middleware dasar) (Minggu 4)
- [ ] Implementasi API resource sesuai prinsip REST (Minggu 5)
- [ ] Schema/model dan koneksi database (Minggu 6)
- [ ] CRUD API terintegrasi database dengan validasi input (Minggu 7)

### Kriteria Selesai
- Endpoint Express.js menangani routing, request/response, dan middleware dasar.
- API resource mengembalikan response JSON dengan status code yang sesuai.
- CRUD API berjalan penuh dan terintegrasi dengan database.

---

## M3 — UTS: Mini Project Backend (CPMK117)

**Periode:**
- SI-VA: 02 Nov 2026 (Minggu 8)
- SI-VB: 03 Nov 2026 (Minggu 8)

**Tujuan:** Mahasiswa mampu mengimplementasikan API inti mini project sebagai bentuk penerapan materi Minggu 1–7.

### Deliverables
- [ ] Implementasi API inti mini project (REST API + database)
- [ ] Review dan pengujian mini project
- [ ] Presentasi progres

### Kriteria Selesai
- Mini project backend berjalan dan dipresentasikan pada pertemuan UTS.

---

## M4 — Keamanan & Keandalan (CPMK118)

**Periode:**
- SI-VA: 09 Nov – 30 Nov 2026 (Minggu 9–12)
- SI-VB: 10 Nov – 01 Des 2026 (Minggu 9–12)

**Tujuan:** Mahasiswa mampu menerapkan authentication dan authorization, mengamankan API sesuai prinsip OWASP, serta membangun error handling, logging, dan konfigurasi environment yang terpusat.

### Deliverables
- [ ] Endpoint register dan login dengan password hashing (Minggu 9)
- [ ] Protected API + role-based authorization (Minggu 10)
- [ ] Security checklist dan hardening API (validation, security headers, CORS, rate limiting, secret management) (Minggu 11)
- [ ] Error handler terpusat, logger, dan konfigurasi environment (Minggu 12)

### Kriteria Selesai
- Register/login berjalan dengan password hashing.
- Endpoint terlindungi JWT dan authorization per role.
- Prinsip keamanan OWASP/API Security diterapkan dan terdokumentasi dalam checklist.
- Error handling terpusat, logging, dan environment configuration berfungsi.

---

## M5 — Quality & Delivery (CPMK118)

**Periode:**
- SI-VA: 07 Des – 21 Des 2026 (Minggu 13–15)
- SI-VB: 08 Des – 22 Des 2026 (Minggu 13–15)

**Tujuan:** Mahasiswa mampu menguji API, menyusun dokumentasi, dan menyiapkan backend untuk deployment.

### Deliverables
- [ ] Test suite untuk endpoint utama (positive/negative case) (Minggu 13)
- [ ] Dokumentasi API (OpenAPI/Swagger) + demo integrasi client (Minggu 14)
- [ ] Backend siap deploy (environment production, database production, Git, pengantar Docker) (Minggu 15)

### Kriteria Selesai
- Test suite mencakup endpoint utama dengan positive/negative case.
- Dokumentasi API tersedia dan integrasi client didemokan.
- Backend dapat dideploy dengan environment production.

---

## M6 — UAS: Demo & Presentasi Final Project (CPMK118)

**Periode:**
- SI-VA: 28 Des 2026 (Minggu 16)
- SI-VB: 29 Des 2026 (Minggu 16)

**Tujuan:** Mahasiswa mampu mendemokan final project backend beserta arsitektur, API, pengujian, dan keamanannya.

### Deliverables
- [ ] Demo aplikasi + presentasi arsitektur dan API
- [ ] Evaluasi hasil project

### Kriteria Selesai
- Final project backend dipresentasikan dengan aspek pengujian dan keamanan terpenuhi.

---

## Catatan

- Tanggal target adalah estimasi dan dapat berubah sesuai jadwal yang ditetapkan pihak kampus.
- Progres tiap deliverable dicentang setelah selesai dan diverifikasi pada pertemuan terkait.
- Untuk kelas SI-VA dan SI-VB, tanggal pertemuan dimulai pada hari yang berbeda, tetapi materi dan fase pembelajaran tetap mengikuti urutan yang sama.

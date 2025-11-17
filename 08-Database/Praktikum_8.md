
# **Modul Praktikum 9: Pengantar Database**

**Topik:** Konsep NoSQL/MySQL (SQL) dan CRUD Dasar

-----

## **A. Tujuan Pembelajaran**

Setelah menyelesaikan modul ini, mahasiswa diharapkan mampu:

1.  Menjelaskan peran dan fungsi database dalam arsitektur *backend*.
2.  Menjelaskan konsep dasar **CRUD** (Create, Read, Update, Delete).
3.  Membedakan konsep dasar antara database **SQL (Relational)** seperti MySQL dan **NoSQL (Non-Relational)** seperti MongoDB.
4.  Mengimplementasikan operasi CRUD sederhana menggunakan **Supabase (Cloud)** dan **MySQL (Lokal)**.

## **B. Alat dan Bahan**

1.  Komputer/Laptop dengan Node.js (v18+) dan Visual Studio Code.
2.  Koneksi internet (untuk Demo A).
3.  **Untuk Demo A:** Akun [supabase.com](https://supabase.com) (Free Tier).
4.  **Untuk Demo B:** 
       - XAMPP [xampp.apache.org](https://www.apachefriends.org/index.html) (termasuk MySQL & phpMyAdmin).
       - Laragon [laragon.org](https://laragon.org) (termasuk MySQL & phpMyAdmin).
       - ServBay [servbay.com](https://www.servbay.com/id/download) (termasuk MySQL & phpMyAdmin).

## **C. Dasar Teori**

### 1\. Apa itu Database?

Bayangkan *backend* Anda adalah sebuah kantor. Kode JavaScript (Node.js) adalah **pekerjanya**. Saat jam 5 sore, semua pekerja pulang. Jika data (misal: daftar pengguna) hanya disimpan di memori (variabel), data itu akan **hilang** saat program berhenti.

Database adalah **lemari arsip (filing cabinet) 🗄️** kantor tersebut. Ini adalah tempat permanen untuk menyimpan, mengatur, dan mengambil data dengan aman, bahkan setelah program dimatikan dan dihidupkan kembali.

### 2\. Apa itu CRUD?

CRUD adalah singkatan dari empat operasi dasar yang bisa Anda lakukan pada data di database:

  * **C**REATE: Menambah data baru (misal: user baru mendaftar).
  * **R**EAD: Membaca/mengambil data (misal: menampilkan profil user).
  * **U**PDATE: Mengubah data yang sudah ada (misal: user ganti foto profil).
  * **D**ELETE: Menghapus data (misal: user menghapus postingan).

### 3\. SQL vs NoSQL: Dua Jenis Lemari Arsip

**a) SQL (Relational) - Contoh: MySQL, PostgreSQL**

  * **Analogi:** Buku catatan akuntansi atau spreadsheet Excel yang sangat terstruktur.
  * **Struktur:** Data disimpan dalam **Tabel** yang memiliki **Kolom** (didefinisikan di awal) dan **Baris** (datanya).
  * **Aturan:** Sangat **ketat**. Anda harus mendefinisikan "Schema" (struktur tabel) *sebelum* Anda bisa memasukkan data.
  * **Kapan digunakan?** Cocok untuk data yang sangat terstruktur, konsisten, dan saling berhubungan (misal: data perbankan, sistem akademik).

**b) NoSQL (Non-Relational) - Contoh: MongoDB, Firebase**

  * **Analogi:** Tumpukan dokumen atau folder arsip.
  * **Struktur:** Data disimpan dalam format yang fleksibel, sering kali sebagai **Dokumen** (mirip objek JSON).
  * **Aturan:** Sangat **fleksibel**. Tidak perlu mendefinisikan struktur yang kaku.
  * **Kapan digunakan?** Cocok untuk data yang tidak terstruktur, data yang sangat besar, atau saat Anda butuh pengembangan yang sangat cepat.

**c) Supabase (Cloud BaaS):** 
Supabase adalah platform open-source berbasis Cloud BaaS yang menyediakan seluruh kebutuhan backend mulai dari database, autentikasi, hingga hosting. 

- Supabase merupakan implementasi open-source dari konsep Cloud BaaS ini.  
- Supabase menyediakan dukungan untuk database baik SQL maupun NoSQL, lengkap dengan fitur autentikasi dan penyimpanan file.  
- Platform ini dilengkapi dengan dashboard yang intuitif untuk memudahkan pengelolaan proyek dan database.  
- Supabase kompatibel dengan berbagai bahasa pemrograman populer seperti Node.js, Python, dan lainnya.  
- Supabase sangat cocok untuk pengembangan aplikasi yang cepat (Rapid Development) serta pembuatan prototipe.  
- Fitur tambahan seperti trigger, stored procedure, dan integrasi pihak ketiga juga tersedia di Supabase.  

## **D. Praktikum (Demo A - Cloud BaaS: Supabase)**

Bagian ini menunjukkan cara terhubung ke layanan database cloud modern.

### Bagian 1: Setup Supabase (di Website)

1.  **Buat Proyek:** Buka [supabase.com](https://supabase.com), buat akun, dan buat "New Project".
2.  **Buat Tabel:**
      * Buka "Table Editor".
      * Klik "Create a new table".
      * Nama Tabel: `todos`
      * **PENTING:** **Matikan "Enable Row Level Security (RLS)"** untuk saat ini agar mudah diakses.
      * **Buat Kolom:**
          * `tugas` (Tipe: `text`)
          * `selesai` (Tipe: `boolean`, Default Value: `false`)
      * Klik **Save**.
3.  **Ambil Kunci API:**
      * Pergi ke "Project Settings" \> "API".
      * Salin **Project URL** dan **Project API Key** (`anon` `public`).

4.  **Dokumentasi Lengkap:** [JavaScript Client Library](https://supabase.com/docs/reference/javascript/installing)

### Bagian 2: Setup Proyek Node.js

1.  Buat folder baru: `mkdir praktikum-9-supabase && cd praktikum-9-supabase`
2.  `npm init -y`
3.  Install library Supabase: `npm install @supabase/supabase-js`

### Bagian 3: Kode CRUD (`crud_supabase.js`)

```javascript
// crud_supabase.js
import { createClient } from '@supabase/supabase-js';

// Ganti dengan URL dan ANON KEY dari proyek Supabase Anda
const SUPABASE_URL = 'https://URL_PROYEK_ANDA.supabase.co';
const SUPABASE_KEY = 'KEY_ANON_ANDA_YANG_PANJANG_ITU';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function mainSupabase() {
  console.log("--- DEMO SUPABASE (CLOUD) ---");

  // 1. CREATE
  console.log("\n[CREATE] Menambahkan tugas...");
  await supabase.from('todos').insert([
    { tugas: 'Belajar Supabase', selesai: false },
    { tugas: 'Mengerjakan Modul 9', selesai: true },
  ]);

  // 2. READ
  console.log("\n[READ] Membaca semua tugas...");
  const { data: todos } = await supabase.from('todos').select('*');
  console.log(todos);

  // 3. UPDATE
  console.log("\n[UPDATE] Mengubah 'Belajar Supabase'...");
  await supabase
    .from('todos')
    .update({ selesai: true })
    .eq('tugas', 'Belajar Supabase');

  // 4. DELETE
  console.log("\n[DELETE] Menghapus 'Mengerjakan Modul 9'...");
  await supabase
    .from('todos')
    .delete()
    .eq('tugas', 'Mengerjakan Modul 9');

  // 5. READ (Final)
  console.log("\n[READ] Hasil akhir:");
  const { data: finalData } = await supabase.from('todos').select('*');
  console.log(finalData);
}

mainSupabase();
```

## **E. Praktikum (Demo B - Lokal: MySQL)**

Ini adalah jalur tradisional, menggunakan database di mesin Anda sendiri. Ini gratis, cepat (tidak butuh internet), dan memberi Anda kontrol penuh.

## Bagian 1: Instalasi & Setup Database (Lokal)

1.  **Install XAMPP/Laragon/ServBay:** Ini adalah paket yang berisi MySQL, Apache, dan phpMyAdmin.

2.  Jalankan XAMPP/Laragon/ServBay

3.  **Buka phpMyAdmin:** Buka browser dan pergi ke `http://localhost/phpmyadmin/`.

4.  **Buat Database:**

      * Klik tab "Databases".
      * Masukkan nama database, misalnya `praktikum_db`.
      * Klik "Create".

5.  **Buat Tabel `todos`:**

      * Klik database `praktikum_db` di menu kiri.
      * Klik tab **"SQL"**.
      * Salin-tempel kode SQL di bawah ini dan klik **"Go"**:

    <!-- end list -->

    ```sql
    CREATE TABLE todos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      tugas TEXT NOT NULL,
      selesai BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

      * Anda sekarang memiliki tabel `todos` yang siap digunakan.

## Bagian 2: Setup Proyek Node.js

1.  Buat folder baru: `mkdir praktikum-9-mysql && cd praktikum-9-mysql`
2.  `npm init -y`
3.  **Install MySQL Driver:** Kita akan menggunakan `mysql2` yang mendukung Promise & async/await.
    ```bash
    npm install mysql2
    ```

## Bagian 3: Kode CRUD (`crud_mysql.js`)

```javascript
// crud_mysql.js
import mysql from 'mysql2/promise';

// Konfigurasi koneksi ke MySQL lokal (default XAMPP)
const dbConfig = {
  host: 'localhost',
  user: 'root',       // User default XAMPP/Laragon/ServBay
  password: '',       // Password default XAMPP/Laragon/ServBay (kosong)
  database: 'praktikum_db' // Database yang kita buat
};

async function mainMySQL() {
  console.log("--- DEMO MYSQL (LOKAL) ---");
  let connection;

  try {
    // Buat koneksi
    connection = await mysql.createConnection(dbConfig);
    console.log("Berhasil terhubung ke database MySQL.");

    // 1. CREATE
    console.log("\n[CREATE] Menambahkan tugas...");
    // Tanda '?' adalah 'placeholder' untuk keamanan (mencegah SQL Injection)
    await connection.execute(
      'INSERT INTO todos (tugas, selesai) VALUES (?, ?), (?, ?)',
      ['Belajar MySQL', false, 'Mengerjakan Modul 9', true]
    );

    // 2. READ
    console.log("\n[READ] Membaca semua tugas...");
    const [rows] = await connection.execute('SELECT * FROM todos');
    console.log(rows);

    // 3. UPDATE
    console.log("\n[UPDATE] Mengubah 'Belajar MySQL'...");
    await connection.execute(
      'UPDATE todos SET selesai = ? WHERE tugas = ?',
      [true, 'Belajar MySQL']
    );

    // 4. DELETE
    console.log("\n[DELETE] Menghapus 'Mengerjakan Modul 9'...");
    await connection.execute(
      'DELETE FROM todos WHERE tugas = ?',
      ['Mengerjakan Modul 9']
    );

    // 5. READ (Final)
    console.log("\n[READ] Hasil akhir:");
    const [finalRows] = await connection.execute('SELECT * FROM todos');
    console.log(finalRows);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // 5. Tutup koneksi
    if (connection) {
      await connection.end();
      console.log("\nKoneksi ke database ditutup.");
    }
  }
}

mainMySQL();
```
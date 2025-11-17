# **Studi Kasus 8: Agregator Aktivitas Pengguna (User Dashboard)**

## **A. Skenario**

Anda bekerja sebagai *Backend Developer* di sebuah platform media sosial. Tim Frontend membutuhkan sebuah API endpoint (simulasi) yang dapat menampilkan **rangkuman aktivitas pengguna** dalam satu kali pemanggilan.

Saat ini, data tersebar di tiga *endpoint* yang berbeda:

1.  Data **Profil User**.
2.  Data **Postingan** user tersebut.
3.  Data **Todo List** user tersebut.

Tugas Anda adalah membuat fungsi JavaScript yang menggabungkan data dari ketiga sumber tersebut menjadi satu laporan yang rapi.

## **B. Sumber Data (API)**

Gunakan layanan *dummy* [JSONPlaceholder](https://jsonplaceholder.typicode.com) dengan ID pengguna **1**:

1.  **Profil**: `https://jsonplaceholder.typicode.com/users/1`
2.  **Posts**: `https://jsonplaceholder.typicode.com/users/1/posts`
3.  **Todos**: `https://jsonplaceholder.typicode.com/users/1/todos`

## **C. Misi Anda**

Buat file bernama `dashboard.js`. Tulis program menggunakan **`async/await`** yang melakukan langkah berikut:

1.  Mengambil data **Profil** (ambil nama dan email).
2.  Mengambil daftar **Posts** (hitung total jumlah postingan).
3.  Mengambil daftar **Todos** (hitung berapa banyak tugas yang `completed: true`).
4.  Menampilkan laporan di terminal dengan format output di bawah ini.
5.  **Wajib:** Gunakan `try...catch` untuk menangani potensi error (misalnya internet mati).

## **D. Target Output**

Program Anda harus menghasilkan tampilan seperti ini di terminal:

```text
--- MEMUAT DATA USER ID: 1 ---

=========================================
    DASHBOARD AKTIVITAS PENGGUNA
=========================================
Nama User    : Leanne Graham
Email        : Sincere@april.biz
Total Post   : 10 postingan
Tugas Selesai: 11 / 20 tugas
=========================================
```

-----

## **E. Petunjuk & Solusi**

Cobalah kerjakan sendiri terlebih dahulu. Jika mentok, silakan pelajari solusi di bawah ini.

**Logika Pengerjaan:**

1.  Kita butuh fungsi `async`.
2.  Kita lakukan 3 kali `fetch`.
3.  Data Posts dan Todos berbentuk *Array*, jadi kita bisa gunakan properti `.length` untuk menghitung total, dan `.filter()` untuk mencari tugas yang selesai.

#### **Kode Solusi (`dashboard.js`)**

```javascript
// dashboard.js

async function getUserDashboard(userId) {
  console.log(`--- MEMUAT DATA USER ID: ${userId} ---`);

  try {
    // 1. Definisikan URL
    const urlUser = `https://jsonplaceholder.typicode.com/users/${userId}`;
    const urlPosts = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;
    const urlTodos = `https://jsonplaceholder.typicode.com/users/${userId}/todos`;

    // 2. Fetch Data (Sequential - Berurutan)
    // Mengambil data User
    const respUser = await fetch(urlUser);
    if (!respUser.ok) throw new Error("Gagal mengambil data User");
    const userData = await respUser.json();

    // Mengambil data Posts
    const respPosts = await fetch(urlPosts);
    if (!respPosts.ok) throw new Error("Gagal mengambil data Posts");
    const postsData = await respPosts.json();

    // Mengambil data Todos
    const respTodos = await fetch(urlTodos);
    if (!respTodos.ok) throw new Error("Gagal mengambil data Todos");
    const todosData = await respTodos.json();

    // 3. Pengolahan Data (Logic)
    const totalPosts = postsData.length; // Hitung jumlah array
    const totalTodos = todosData.length;
    
    // Filter todo yang completed = true
    const completedTodos = todosData.filter(todo => todo.completed === true).length;

    // 4. Tampilkan Output
    console.log("\n=========================================");
    console.log("    DASHBOARD AKTIVITAS PENGGUNA");
    console.log("=========================================");
    console.log(`Nama User    : ${userData.name}`);
    console.log(`Email        : ${userData.email}`);
    console.log(`Total Post   : ${totalPosts} postingan`);
    console.log(`Tugas Selesai: ${completedTodos} / ${totalTodos} tugas`);
    console.log("=========================================");

  } catch (error) {
    console.log("\n[ERROR] Terjadi kesalahan:");
    console.log(error.message);
  }
}

// Jalankan fungsi
getUserDashboard(1);
```

### **F. Tantangan Ekstra (Level Up\!)**

Pada solusi di atas, kode berjalan secara **Synchronous** (berurutan). Artinya:

  * Ambil User (tunggu selesai...) -> lalu Ambil Posts (tunggu selesai...) -> lalu Ambil Todos.

> Jika satu request memakan waktu 1 detik, total waktu tunggu adalah 3 detik.

**Tantangan:**

Memodifikasi kode di atas agar pengambilan data **Posts** dan **Todos** berjalan secara **Paralel** (bersamaan) menggunakan `Promise.all()`. 

Ini akan membuat performa aplikasi Anda jauh lebih cepat.

Buat file baru bernama `dashboard_paralel.js`.

*Hint:*

```javascript
const [postsData, todosData] = await Promise.all([
  // fetch post di sini...,
  // fetch todos di sini...
]);
```
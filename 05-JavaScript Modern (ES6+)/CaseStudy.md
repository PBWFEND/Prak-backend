# Studi Kasus 5: Refactor `todolist.js` (dari Modul 3)

## **Skenario**

Ambil kode `todolist.js` dari Modul 3. Kode tersebut banyak menggunakan *callback function* (`function(...) { ... }`) di dalam `forEach`, `filter`, dan `map`. Tugas Anda adalah me-refactor kode tersebut menggunakan **Arrow Function** dan **Destructuring**.

### **Tugas**

1.  Salin file `todolist.js` (Modul 3) ke folder `praktikum-5` dan beri nama `todolist_modern.js`.

2.  **Refactor (Arrow Function):** Ganti semua *anonymous function* di dalam `.forEach()`, `.filter()`, dan `.map()` menjadi *arrow function*.

3.  **Refactor (Destructuring):** Di dalam `.forEach()` yang menampilkan semua tugas, gunakan *destructuring* pada parameter `task` untuk langsung mendapatkan `nama` dan `selesai` agar kode lebih bersih.

**Contoh Target Refactor:**

```javascript
// Kode LAMA (di dalam .forEach)
tasks.forEach(function(task) {
  const status = task.selesai ? "[✓]" : "[x]";
  console.log(`${status} ${task.nama}`);
});

// Kode BARU (setelah refactor)
tasks.forEach((task) => {
  // Gunakan destructuring di sini
  const { nama, selesai } = task;
  const status = selesai ? "[✓]" : "[x]";
  console.log(`${status} ${nama}`);
});
```

### **Tantangan Ekstra:**

Untuk tantangan ekstra, refactor _callback_ di dalam `.filter()` dan `.map() `menjadi _arrow function_ satu baris dengan _implicit return_.


**Penjelasan**:

- Arrow function dengan satu baris dapat menghilangkan kurung kurawal `{}` dan kata kunci `return`

- Contoh: `(task) => task.selesai` akan secara implisit mengembalikan nilai `task.selesai`

- Fitur ini membuat kode lebih ringkas dan mudah dibaca 

# Kalkulator Kriptografi Berbasis Web

Sebuah program kalkulator enkripsi dan dekripsi berbasis web sederhana yang mengimplementasikan 5 jenis *cipher* klasik. Program ini dibangun menggunakan kemurnian HTML, CSS, dan JavaScript tanpa *framework* tambahan, sehingga sangat mudah untuk dijalankan dan dimodifikasi.

## Fitur Cipher yang Didukung

Aplikasi ini mendukung algoritma berikut (berfungsi untuk huruf alfabet A-Z):

1.  **Vigenere Cipher standard (26 huruf alfabet)**
    *   Menggunakan kata kuci teks untuk menggeser huruf pada *plaintext*.
2.  **Affine Cipher**
    *   Menggunakan fungsi matematika $E(x) = (ax + b) \pmod{26}$.
    *   Memerlukan dua kunci berupa angka: *Multiplier* (a) dan *Shift* (b). Nilai (a) harus relatif prima terhadap 26.
3.  **Playfair Cipher (26 huruf alfabet)**
    *   Menggunakan pergeseran berbasis matriks 5x5 yang digenerasi berdasarkan sebuah kata kunci. (Karakter J digabung dengan I).
4.  **Hill Cipher**
    *   Menyandikan blok-blok huruf menggunakan perkalian matriks modulo 26.
    *   Aplikasi ini mendukung matriks ukuran 2x2. Determinan matrik harus relatif prima dengan 26 agar bisa didekripsi.
5.  **Enigma Cipher**
    *   Simulasi rotor Enigma sederhana menggunakan rotor **I, II, dan III** serta pemantul/reflektor **B** (berdasarkan konfigurasi standar mesin Wehrmacht Enigma).

## Identitas Pembuat

*   **Nama:** Darren Nathanael Melakha
*   **NIM:** 21120123120001
*   **Kelas:** Kriptografi C

---

## Cara Menjalankan Aplikasi

Aplikasi ini terdiri dari *front-end* murni, berjalan langsung di *browser*. Anda bisa menjalankannya dengan dua cara:

### Cara 1: Tanpa Server (Stand-alone)
Cara paling mudah untuk membuka program ini:
1. Buka folder `Web Kripto` di komputer Anda (`c:\Kuliah\Matkul Sem 6\Kripto\Web Kripto`).
2. Klik ganda ganda (`double-click`) file `index.html`.
3. Aplikasi akan langsung terbuka di browser utama Anda (Google Chrome, Microsoft Edge, dll).

### Cara 2: Menggunakan Local Server (Node.js)
Jika Anda ingin mengembangkan lebih lanjut atau melakukan modifikasi dengan fitur *live-reload*:
1. Pastikan Anda telah menginstal [Node.js](https://nodejs.org/).
2. Buka terminal atau Command Prompt dan arahkan ke dalam direktori aplikasi ini.
3. Instal *dependency*-nya dengan menjalankan:
   ```bash
   npm install
   ```
4. Jalankan *local server* dengan perintah:
   ```bash
   npm start
   ```
5. Browser Anda akan secara otomatis membuka aplikasi di alamat `http://127.0.0.1:8080/`. Jika Anda mengubah atau menyimpan kode (`index.html`, `style.css`, atau `script.js`), halaman di browser akan otomatis diperbarui (*refresh*).

## Struktur File
*   `index.html` : Kerangka HTML untuk antarmuka pengguna (GUI).
*   `style.css` : Lembar gaya desain visual aplikasi untuk tampilan yang rapih.
*   `script.js` : Sentralisasi file bahasa Javascript yang berisi logika komputasi untuk kelima *cipher*.
*   `package.json` & `package-lock.json` : Konfigurasi untuk dukungan *Live Server* di Node.js.

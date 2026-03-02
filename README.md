# Kalkulator Kriptografi Berbasis Web

Sebuah program kalkulator enkripsi dan dekripsi berbasis web sederhana yang mengimplementasikan 5 jenis *cipher* klasik. Program ini dibangun menggunakan HTML, CSS, dan JavaScript tanpa *framework* tambahan.

## Fitur Cipher yang Didukung

Aplikasi ini mendukung algoritma berikut

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

### Menggunakan Local Server (Node.js)
1. Pastikan telah menginstal [Node.js](https://nodejs.org/).
2. Buka terminal atau Command Prompt dan arahkan ke dalam direktori aplikasi ini.
3. Instal *dependency*-nya dengan menjalankan:
   ```bash
   npm install
   ```
4. Jalankan *local server* dengan perintah:
   ```bash
   npm start
   ```
5. Browser akan secara otomatis membuka aplikasi di alamat `http://127.0.0.1:8080/`. Jika mengubah atau menyimpan kode (`index.html`, `style.css`, atau `script.js`), halaman di browser akan otomatis diperbarui (*refresh*).

## Struktur File
*   `index.html` : Kerangka HTML untuk antarmuka pengguna (GUI).
*   `style.css` : Lembar gaya desain visual aplikasi untuk tampilan yang rapih.
*   `script.js` : Sentralisasi file bahasa Javascript yang berisi logika komputasi untuk kelima *cipher*.
*   `package.json` & `package-lock.json` : Konfigurasi untuk dukungan *Live Server* di Node.js.

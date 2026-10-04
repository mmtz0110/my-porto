# Portofolio Agnaya Mumtazul Wafir

Website portofolio pribadi untuk memperkenalkan latar pendidikan, pengalaman organisasi dan profesional, minat teknologi, serta proyek yang sedang dibangun atau dieksplorasi.

## Tentang proyek

Portofolio ini dibuat sebagai aplikasi web interaktif dengan tema gelap yang terinspirasi Catppuccin Mocha. Halaman disusun dalam beberapa bagian:

- **Hero** dengan animasi mengetik nama dan kartu identitas 3D interaktif.
- **Tentang saya** yang merangkum minat dan cara belajar.
- **Pendidikan** dari SMK Informatika CBI, jurusan Rekayasa Perangkat Lunak, hingga Universitas Nusa Putra.
- **Teknologi dan pembelajaran** dengan pencarian, filter kategori, dan ikon teknologi.
- **Pengalaman** di Leafiq.id serta organisasi Himpunan Mahasiswa Teknik Informatika.
- **Proyek pilihan** di bidang aplikasi, sistem, hardware/IoT, dan AI/ML.
- **Kontak** dengan tautan sosial dan formulir pesan.

Kartu identitas 3D menggunakan gambar sisi depan dan belakang dari `public/idcardDepan.png` dan `public/idcardBelakang.png`.

## Teknologi

- React 19 dan TypeScript
- Vite 6
- Tailwind CSS 4
- Motion untuk animasi antarmuka
- Three.js untuk kartu identitas 3D
- Lucide React untuk ikon
- Express untuk server dan endpoint kontak

## Menjalankan secara lokal

**Prasyarat:** Node.js dan npm.

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` setelah server berjalan. Mode pengembangan menggunakan Express dengan middleware Vite.

Tidak diperlukan `GEMINI_API_KEY` atau berkas environment untuk menjalankan portofolio ini.

## Perintah yang tersedia

```bash
npm run dev    # Jalankan server pengembangan
npm run lint   # Periksa tipe TypeScript
npm run build  # Build frontend dan server produksi
npm start      # Jalankan server hasil build
npm run clean  # Hapus output build
```

Untuk menjalankan hasil produksi secara lokal:

```bash
npm run build
npm start
```

## Struktur direktori

```text
.
├── public/                 # Aset statis, termasuk gambar kartu identitas
├── src/
│   ├── components/         # Bagian halaman dan komponen antarmuka
│   ├── context/            # State bahasa dan tema
│   ├── data/               # Konten portofolio
│   ├── types.ts            # Tipe data TypeScript
│   ├── App.tsx             # Komposisi halaman utama
│   └── index.css           # Gaya global dan palet warna
├── server.ts               # Server Express, middleware Vite, endpoint API
└── vite.config.ts          # Konfigurasi Vite
```

Konten profil, pendidikan, pengalaman, keterampilan, dan proyek dikelola di `src/data/portfolioData.ts`.

## Catatan formulir kontak

Endpoint `POST /api/contact` saat ini memvalidasi kolom wajib dan mengembalikan konfirmasi simulasi. Pesan belum disimpan ke database dan belum dikirim melalui email.

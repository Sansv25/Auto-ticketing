# 🤖 Bot Runner Otomasi Tiket ICONNET (Instagram DM)

Aplikasi bot lokal untuk petugas piket magang ICONNET Bali & Nusa Tenggara. Bot ini berjalan di laptop petugas piket untuk:
1. Memantau antrean pelaporan tiket dari web Supabase secara otomatis.
2. Mengetikkan data pelanggan dan keluhan ke DM Instagram `@iconnet.here`.
3. Menjawab pertanyaan CS secara cerdas menggunakan AI Nemotron.
4. Mengekstrak nomor tiket resmi atau resolusi (terisolir/gangguan massal) dan menutup sesi chat dengan aman.

---

## 💻 Syarat di Komputer/Laptop Petugas
1. **Google Chrome** sudah terpasang.
2. **Node.js** (LTS) sudah terpasang. Unduh di [nodejs.org](https://nodejs.org/).

---

## 🚀 Panduan Penggunaan Singkat

### Langkah 1: Login Akun Instagram (Hanya Sekali di Awal)
1. Klik ganda **`1_LOGIN_INSTAGRAM.bat`**.
2. Masuk ke akun Instagram pelapor tim di jendela browser Chrome yang terbuka.
3. Setelah masuk ke Beranda / DM, **tutup jendela Chrome** tersebut. Sesi login akan tersimpan permanen di laptop Anda.

### Langkah 2: Mulai Shift Piket
1. Klik ganda **`2_MULAI_PIKET.bat`**.
2. *(Pertama kali saja)*: Masukkan email & password akun web Absensi Piket Anda di terminal.
   - **Zero-Manual Config**: Anda tidak perlu memindahkan file `.env` secara manual! Bot otomatis mendownload konfigurasi dan kunci AI dari server Supabase.
3. Bot langsung aktif! Di halaman Web Ticketing akan muncul lencana:
   `🟢 Bot Piket Online (Nama Anda)`.
4. Biarkan jendela terminal tetap terbuka selama jam kerja piket Anda.

### Langkah 3: Selesai Piket
Tutup jendela terminal (atau tekan `Ctrl + C`). Status di web dashboard otomatis menjadi `Offline`.

// 1. Import library yang dibutuhkan
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// 2. Load file konfigurasi .env
dotenv.config({ path: path.join(__dirname, '.env') });

// load koneksi database
const db = require('./config/db');

// 3. Inisialisasi aplikasi Express
const app = express();
const PORT = process.env.PORT || 5000;

// 4. Middleware dasar
app.use(cors()); // Mengizinkan request dari domain lain (Frontend)
app.use(express.json()); // Membaca body request bertipe JSON
app.use(express.urlencoded({ extended: true })); // Membaca body request bertipe form-data/url-encoded

//menyajikan file statis (misal: file PDF, gambar, dll) dari folder public
app.use('/public', express.static(path.join(__dirname, '../public/uploads')));

// 5. Endpoint dasar (Testing Server)
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Selamat datang di API Portofolio Dinamis!',
    version: '1.0.0'
  });
});



// Endpoint untuk cek status API
app.get('/api/status', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server dalam keadaan sehat dan aktif.',
    timestamp: new Date().toISOString()
  });
});



// Endpoint untuk data diri
app.get('/api/biodata', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      nama: "Nama Lengkap Siswa",
      kelas: "XI RPL 1",
      cita_cita: "Fullstack Developer",
      hobi: "Coding & Gaming"
    }
  });
});
// ===================================================
// DAFTARKAN RUTE / ROUTES DI SINI
// ===================================================
const profileRoutes = require('./routes/profileRoutes');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const contactRoutes = require('./routes/contactRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/resumes', resumeRoutes);

// 6. Middleware untuk menangani route yang tidak ditemukan (404 Not Found)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan!'
  });
});

// 7. Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di: http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');

// GET ?api/profile - mengambil data profil pemilik portofolio
router.get('/profile', profileController.getProfile);

// PUT /api/profile/:id - memperbarui data profil berdasarkan ID 
router.put('/profile/:id', profileController.updateProfile);

module.exports = router;

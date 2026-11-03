const db = require('../config/db');

// ini tampilkan semua data
const getAllExperiences = async () => {
    const [rows] = await db.query('SELECT * FROM experiences ORDER BY start_date DESC');
    return rows;
};

// ini tampilkan semua data berdasarkan id
const getExperienceById = async (id) => {
    const [rows] = await db.query('SELECT * FROM experiences WHERE id = ?', [id]);
    return rows[0];
};

// membuat data
const createExperience = async (data) => {
    const { title, company, location, start_date, end_date, description } = data;
    const [result] = await db.query(
        'INSERT INTO experiences (title,company, location, start_date, end_date, description) VALUES (?, ?, ?, ?, ?, ?)',
        [title, company, location, start_date, end_date, description]
    );
    return result;
};

// mengedit data
const updateExperience = async (id, data) => {
    const { title, company, location, start_date, end_date, description } = data;
    const [result] = await db.query(
        'UPDATE experiences SET title = ?, company = ?, location = ?, start_date = ?, end_date = ?, description = ? WHERE id = ?',
        [title, company, location, start_date, end_date, description, id]
    );
    return result;
};

// menghapus data
const deleteExperience = async (id) => {
    const [result] = await db.query('DELETE FROM experiences WHERE id = ?', [id]);
    return result;
};

module.exports = { getAllExperiences, getExperienceById, createExperience, updateExperience, deleteExperience };
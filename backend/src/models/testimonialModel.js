const db = require('../config/db');

// 1. GET ALL
const getAllTestimonials = async () => {
    const [rows] = await db.query('SELECT * FROM testimonials ORDER BY id DESC');
    return rows;
};

// 2. GET BY ID
const getTestimonialById = async (id) => {
    const [rows] = await db.query('SELECT * FROM testimonials WHERE id = ?', [id]);
    return rows[0];
};

// 3. CREATE
const createTestimonial = async (data) => {
    const { name, role, company, message, avatar_url } = data;
    const [result] = await db.query(
        'INSERT INTO testimonials (name, role, company, message, avatar_url) VALUES (?, ?, ?, ?, ?)',
        [name, role, company || null, message, avatar_url || null]
    );
    return result;
};

// 4. UPDATE
const updateTestimonial = async (id, data) => {
    const { name, role, company, message, avatar_url } = data;
    const [result] = await db.query(
        'UPDATE testimonials SET name = ?, role = ?, company = ?, message = ?, avatar_url = ? WHERE id = ?',
        [name, role, company || null, message, avatar_url || null, id]
    );
    return result;
};

// 5. DELETE
const deleteTestimonial = async (id) => {
    const [result] = await db.query('DELETE FROM testimonials WHERE id = ?', [id]);
    return result;
};

module.exports = {
    getAllTestimonials,
    getTestimonialById,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
};
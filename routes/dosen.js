const express = require('express');
const router = express.Router();
const connection = require('../config/database'); // Pastikan path benar

// Endpoint untuk mengambil semua data dosen
router.get('/', async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM dosen ORDER BY id ASC');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching dosen data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Endpoint untuk mendapatkan data dosen berdasarkan ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await connection.query('SELECT * FROM dosen WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Data tidak ditemukan' });
        }
    } catch (err) {
        console.error('Error fetching dosen data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint untuk menambahkan data dosen
router.post('/', async (req, res) => {
    const { nip, nama, alamat, no_telp, email, bidang_keahlian } = req.body;
    try {
        const [result] = await connection.query(
            'INSERT INTO dosen (nip, nama, alamat, no_telp, email, bidang_keahlian) VALUES (?, ?, ?, ?, ?, ?)',
            [nip, nama, alamat, no_telp, email, bidang_keahlian]
        );
        res.json({ success: true, id: result.insertId });
    } catch (err) {
        console.error('Error adding dosen data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint untuk mengedit data dosen
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nip, nama, alamat, no_telp, email, bidang_keahlian } = req.body;
    try {
        const [result] = await connection.query(
            'UPDATE dosen SET nip = ?, nama = ?, alamat = ?, no_telp = ?, email = ?, bidang_keahlian = ? WHERE id = ?',
            [nip, nama, alamat, no_telp, email, bidang_keahlian, id]
        );
        res.json({ success: true });
    } catch (err) {
        console.error('Error updating dosen data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint untuk menghapus data dosen
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Menerima permintaan DELETE untuk id: ${id}`);
    try {
        const [result] = await connection.query('DELETE FROM dosen WHERE id = ?', [id]);
        console.log(`Hasil penghapusan:`, result);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Data dosen tidak ditemukan' });
        }

        res.json({ success: true });
    } catch (err) {
        console.error('Error deleting dosen data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

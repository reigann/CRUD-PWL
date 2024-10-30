const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../config/database');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // Menggunakan async/await dengan connection.query()
        const [results] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);

        if (results.length === 0) {
            return res.status(401).json({ message: 'Username tidak ditemukan' });
        }

        const user = results[0];

        // Membandingkan password yang diberikan dengan hash di database
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Password salah' });
        }

        // Menyimpan informasi pengguna ke dalam session
        req.session.userId = user.id;
        req.session.username = user.username;

        res.json({ message: 'Login berhasil', username: user.username });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Database error' });
    }
});

        router.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/login.html');
});


module.exports = router;

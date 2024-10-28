const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Middleware untuk memastikan login
const checkAuth = (req, res, next) => {
  if (!req.session.user) return res.status(401).json({ message: 'Unauthorized' });
  next();
};

router.use(checkAuth);

// Get All Dosen
router.get('/', (req, res) => {
  db.query('SELECT * FROM dosen', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add Dosen
router.post('/add', (req, res) => {
  const { nama, nip, email } = req.body;
  db.query('INSERT INTO dosen (nama, nip, email) VALUES (?, ?, ?)', [nama, nip, email], (err) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

// Delete Dosen
router.delete('/delete/:id', (req, res) => {
  db.query('DELETE FROM dosen WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const router = express.Router();

// Login API
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const isMatch = await bcrypt.compare(password, results[0].password);
      if (isMatch) {
        req.session.user = results[0];
        return res.json({ success: true });
      }
    }
    res.json({ success: false, message: 'Invalid credentials' });
  });
});

// Logout API
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

module.exports = router;

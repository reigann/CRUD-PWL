const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

// Routes
const authRoutes = require('./routes/auth');
const dosenRoutes = require('./routes/dosen');
app.use('/auth', authRoutes);
app.use('/dosen', dosenRoutes);

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));

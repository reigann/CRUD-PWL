    const express = require('express');
    const session = require('express-session');
    const path = require('path');
    const app = express();

    // Middleware lainnya
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Konfigurasi session
    app.use(session({
        secret: 'secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 30 * 60 * 1000 }
    }));

    // Middleware untuk cek autentikasi
    const checkAuth = (req, res, next) => {
        if (!req.session.userId) {
            if (req.originalUrl.startsWith('/api/')) {
                return res.status(401).json({ error: 'Not authenticated' });
            } else {
                return res.redirect('/login.html?message=notloggedin');
            }
        }
        next();
    };

    // Rute untuk file statis yang tidak memerlukan autentikasi
    app.use(express.static(path.join(__dirname, 'public')));

    // Rute untuk file statis yang memerlukan autentikasi
    app.use('/dashboard.html', checkAuth, express.static(path.join(__dirname, 'protected', 'dashboard.html')));
    app.use('/js', checkAuth, express.static(path.join(__dirname, 'protected', 'js')));

    // Rute API
    app.use('/api/dosen', checkAuth, require('./routes/dosen'));
    app.use('/api/auth', require('./routes/auth'));

    // Rute lainnya (opsional)
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    // Jalankan server
    app.listen(3000, () => {
        console.log('Server berjalan di http://localhost:3000');
    });

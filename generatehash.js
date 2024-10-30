const bcrypt = require('bcrypt');

const passwords = ['admin123', 'user123', 'reigan']; // Daftar password yang ingin di-hash

passwords.forEach(password => {
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;
        console.log(`Hash for ${password}:`, hash);
    });
});

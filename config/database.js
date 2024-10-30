const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_kampus',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Tidak perlu memanggil connection.connect() atau menggunakan util.promisify

module.exports = connection;

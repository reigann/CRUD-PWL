const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // sesuaikan dengan username MySQL Anda
  password: '', // sesuaikan dengan password MySQL Anda
  database: 'dosen_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports = db;

const bcrypt = require('bcrypt');

async function hashPassword(password) {
  try {
    const hash = await bcrypt.hash(password, 10);
    console.log(hash); // Ini akan menampilkan hash jika berhasil
  } catch (err) {
    console.error(err);
  }
}

hashPassword('reigan123');

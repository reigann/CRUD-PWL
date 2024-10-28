// Fungsi login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
  
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  
    const result = await response.json();
    if (result.success) {
      window.location.href = '/dashboard.html';
    } else {
      document.getElementById('loginError').textContent = result.message;
    }
  });
  
  // Fungsi menambah data dosen
  document.getElementById('addForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
  
    const response = await fetch('/dosen/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  
    if (response.ok) fetchDosen();
  });
  
  // Fungsi mengambil data dosen
  async function fetchDosen() {
    const response = await fetch('/dosen');
    const dosen = await response.json();
    const tbody = document.querySelector('#dosenTable tbody');
    tbody.innerHTML = '';
    dosen.forEach(d => {
      const row = `<tr><td>${d.nama}</td><td>${d.nip}</td><td>${d.email}</td>
                   <td><button onclick="deleteDosen(${d.id})">Hapus</button></td></tr>`;
      tbody.innerHTML += row;
    });
  }
  
  // Fungsi menghapus data dosen
  async function deleteDosen(id) {
    await fetch(`/dosen/delete/${id}`, { method: 'DELETE' });
    fetchDosen();
  }
  
  // Fungsi logout
  async function logout() {
    await fetch('/auth/logout', { method: 'POST' });
    window.location.href = '/index.html';
  }
  
  // Panggil data dosen jika berada di halaman dashboard
  if (window.location.pathname === '/dashboard.html') fetchDosen();
  
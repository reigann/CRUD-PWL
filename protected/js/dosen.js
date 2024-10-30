// Fungsi untuk memuat data dosen
function loadDosenData() {
    fetch('/api/dosen')
        .then(response => response.json())
        .then(data => {

            data.sort((a, b) => a.id - b.id);
            
            const tbody = document.getElementById('dosen-table-body');
            tbody.innerHTML = '';
            data.forEach(dosen => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${dosen.nip}</td>
                    <td>${dosen.nama}</td>
                    <td>${dosen.alamat}</td>
                    <td>${dosen.no_telp}</td>
                    <td>${dosen.email}</td>
                    <td>${dosen.bidang_keahlian}</td>
                    <td>
                        <button class="btn btn-sm btn-warning btn-edit" data-id="${dosen.id}">Edit</button>
                        <button class="btn btn-sm btn-danger btn-delete" data-id="${dosen.id}">Hapus</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            // Tambahkan event listener untuk tombol edit dan hapus
            const editButtons = document.querySelectorAll('.btn-edit');
            editButtons.forEach(button => {
                button.addEventListener('click', handleEdit);
            });

            const deleteButtons = document.querySelectorAll('.btn-delete');
            deleteButtons.forEach(button => {
                button.addEventListener('click', handleDelete);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Fungsi untuk menangani penambahan dan pengeditan data dosen
function handleSave() {
    const dosenId = document.getElementById('dosen-id').value;
    const dosenData = {
        nip: document.getElementById('nip').value,
        nama: document.getElementById('nama').value,
        alamat: document.getElementById('alamat').value,
        no_telp: document.getElementById('no_telp').value,
        email: document.getElementById('email').value,
        bidang_keahlian: document.getElementById('bidang_keahlian').value,
    };

    let method = 'POST';
    let url = '/api/dosen';

    if (dosenId) {
        method = 'PUT';
        url = `/api/dosen/${dosenId}`;
    }

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dosenData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Tutup modal dan refresh data tabel
            document.getElementById('dosen-form').reset();
            const modal = bootstrap.Modal.getInstance(document.getElementById('dosenModal'));
            modal.hide();
            loadDosenData();
        } else {
            alert('Gagal menyimpan data dosen.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Fungsi untuk menangani pengeditan data dosen
function handleEdit(event) {
    const id = event.target.getAttribute('data-id');
    fetch(`/api/dosen/${id}`)
        .then(response => response.json())
        .then(dosen => {
            document.getElementById('dosen-id').value = dosen.id;
            document.getElementById('nip').value = dosen.nip;
            document.getElementById('nama').value = dosen.nama;
            document.getElementById('alamat').value = dosen.alamat;
            document.getElementById('no_telp').value = dosen.no_telp;
            document.getElementById('email').value = dosen.email;
            document.getElementById('bidang_keahlian').value = dosen.bidang_keahlian;

            // Ubah judul modal
            document.getElementById('modal-title').textContent = 'Edit Dosen';
            // Tampilkan modal
            const dosenModal = new bootstrap.Modal(document.getElementById('dosenModal'));
            dosenModal.show();
        })
        .catch(error => {
            console.error('Error fetching dosen data:', error);
        });
}

// Fungsi untuk menangani penghapusan data dosen
function handleDelete(event) {
    const id = event.target.getAttribute('data-id');
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        fetch(`/api/dosen/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then(async response => {
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Unknown error');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                loadDosenData();
            } else {
                alert('Gagal menghapus data dosen.');
            }
        })
        .catch(error => {
            console.error('Error deleting dosen:', error);
            alert(`Error deleting dosen: ${error.message}`);
        });
    }
}




// Event listener untuk tombol simpan
document.getElementById('btn-save').addEventListener('click', handleSave);

// Event listener untuk tombol tambah
document.getElementById('btn-add').addEventListener('click', function() {
    document.getElementById('dosen-form').reset();
    document.getElementById('dosen-id').value = '';
    document.getElementById('modal-title').textContent = 'Tambah Dosen';
});

// Setelah data dosen dimuat dan tombol hapus dibuat
const deleteButtons = document.querySelectorAll('.btn-delete');
deleteButtons.forEach(button => {
    button.addEventListener('click', handleDelete);
});


// Panggil fungsi loadDosenData saat halaman dimuat
document.addEventListener('DOMContentLoaded', loadDosenData);

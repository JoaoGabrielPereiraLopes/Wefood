let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

function loadAccounts() {
    const tbody = document.getElementById('accounts-tbody');
    tbody.innerHTML = '';

    accounts.forEach((account, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${account.name}</td>
            <td>${account.email}</td>
            <td>
                <div class="actions-btn">
                    <button class="edit-btn" onclick="openEditModal(${index})">Editar</button>
                    <button class="delete-btn" onclick="openDeleteModal(${index})">Excluir</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function openEditModal(index) {
    const account = accounts[index];
    document.getElementById('edit-name').value = account.name;
    document.getElementById('edit-email').value = account.email;
    document.getElementById('editModal').style.display = 'flex';
}

function openDeleteModal(index) {
    document.getElementById('confirmModal').style.display = 'flex';
}

function saveEdit() {
    const index = accounts.findIndex(account => account.email === document.getElementById('edit-email').value);
    accounts[index] = {
        name: document.getElementById('edit-name').value,
        email: document.getElementById('edit-email').value,

        //Atualizar a senha
    };
    localStorage.setItem('accounts', JSON.stringify(accounts));
    closeEditModal();
    loadAccounts();
}

function deleteAccount(index) {
    accounts.splice(index, 1);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    closeDeleteModal();
    loadAccounts();
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

function closeDeleteModal() {
    document.getElementById('confirmModal').style.display = 'none';
}

// Carregar as contas assim que a página carrega
window.onload = loadAccounts();

// Fechar ao clicar fora
window.onclick = function(event) {
    if (event.target == document.getElementById('editModal')) {
        closeEditModal();
    }
    if (event.target == document.getElementById('confirmModal')) {
        closeDeleteModal();
    }
}

//Animação A Baixo

// Partículas
function createParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 30;
  
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Tamanho Pixels
      const size = Math.random() * 15 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Posição inicial 
      particle.style.left = `${Math.random() * 100}vw`;
      
      // Duração da animação 
      particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
      
      container.appendChild(particle);
    }
  }
  
  createParticles();
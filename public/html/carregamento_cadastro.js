// Esconder a tela de carregamento após o carregamento da página
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.opacity = 0;
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  });
  
  // Validar o formulário e animação ao clicar no botão de cadastro
  document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    // Validação simples
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
  
    if (username && email && password) {
      // Simula um carregamento rápido
      const submitButton = document.querySelector('.btn-register');
      submitButton.disabled = true;
      submitButton.textContent = "Cadastrando...";
  
      setTimeout(() => {
        // Simula o envio e sucesso no cadastro
        alert("Cadastro realizado com sucesso!");
        submitButton.disabled = false;
        submitButton.textContent = "Cadastrar";
        window.location.href = "index.html"; // Redireciona para o site principal
      }, 2000); // Tempo de simulação de envio
    } else {
      alert("Preencha todos os campos.");
    }
  });

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
// Função para exibir sugestões enquanto digita
const searchInput = document.getElementById('search-bar');
const suggestionsList = document.getElementById('suggestions');

// Simulando algumas sugestões (pode ser alterado para carregar sugestões de uma API)
const suggestions = [
  "Pizza",
  "Sushi",
  "Prato Mexicano",
  "Hamburguer",
  "Bebidas",
  "Sobremesas"
];

// Função para filtrar as sugestões com base no que o usuário digita
searchInput.addEventListener('input', function() {
  const inputValue = searchInput.value.toLowerCase();
  suggestionsList.innerHTML = '';

  if (inputValue) {
    const filteredSuggestions = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(inputValue)
    );
    
    filteredSuggestions.forEach(suggestion => {
      const listItem = document.createElement('li');
      listItem.textContent = suggestion;
      suggestionsList.appendChild(listItem);
    });
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
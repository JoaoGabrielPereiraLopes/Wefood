async function Confpratos(){
    const response = await fetch('./get_comidas', {
        method: 'GET',
        headers: {
            'Content-Type':'application/json'
        }
    });

    const result = await response.json();

    result.result.forEach(row => {
        var foodiv= document.getElementById('foods');
//<img src="./imagem" alt="Prato" /> para adicionar imagens
        foodiv.innerHTML+=(`<div class="card-item">
            
            <h3>${row.Nome}</h3>
            <p>${row.Preparo}</p>
            <button class="order-button">R$${row.Preco}</button>
            </div>`)
    });
}

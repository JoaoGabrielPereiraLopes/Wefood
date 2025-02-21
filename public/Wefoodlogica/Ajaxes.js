async function Confpratos(){
    const get_comidas= await fetch('/get_comidas', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
    });
    const result = await get_comidas.json();
    result.result.forEach(row => {
        alert(row)
        var foodiv= document.getElementById('foods');

        foodiv.append(`<div class="card-item">
            <img src="./placeholder" alt="Prato Principal 2" />
            <h3>${row.Nome}</h3>
            <p>${row.Preparo}</p>
            <button class="order-button">R$${row.Preco}</button>
            </div>`)
    });
}
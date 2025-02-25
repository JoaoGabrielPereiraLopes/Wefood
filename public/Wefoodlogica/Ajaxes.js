async function Confpratos(){
    const formData = {
        table:'COMIDA'
    };
    const response = await fetch('./get', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
    });

    const result = await response.json();

    result.result.forEach(row => {
        var foodiv= document.getElementById('foods');
    //<img src="./imagem" alt="Prato" /> para adicionar imagens
    foodiv.innerHTML+=(`<div class="card-item">
            
            <h3>${row.Nome}</h3>
            <p>${row.Preparo}min</p>
            <p>${row.Decricao}</p>
            <button class="order-button">R$${row.Preco}</button>
            </div>`)
    });
}
var radio=''
function radios(value){
    radio=value
}
async function Confform(){
    const tempo=document.getElementById("tempo")
    const preco=document.getElementById("preco")
    const nome=document.getElementById("nome")
    const radios = document.getElementsByName("Tipo");
    const descricao = document.getElementById("descricao");
    const form=document.getElementById('form')
    let valores='('
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        valores+=`${tempo.value},${preco.value},"${nome.value}","${radio}","${descricao.value}")`
        alert(valores)  
        const formData = {
            table: 'COMIDA(Preparo,Preco,Nome,Tipo,Decricao)',
            valores:valores
        };
    
        try{
            const response = await fetch('/insert', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(formData)
            });
            valores=''
            tempo.value=''
            preco.value=''
            nome.value=''
            radio=''
            descricao.value=''
            const radios = document.getElementsByName("Tipo");
            radios.forEach((radio) => {
                if (!radio.disabled) {  // Verifica se o botão não está desativado
                    radio.disabled=true;
                }
            });
        }
        catch (error){
            console.log('Error: ', error);
        }
    });
}
async function confsearch(){
    var query = location.search.slice(1);
    var chaveValor = query.split('=');
    var chave = chaveValor[1];
    const formData = {
        table:'COMIDA',
        atributo:'Nome',
        texto:chave
    };
    const response = await fetch('./search', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
    });

    const result = await response.json();
    console.log(result.result)
    result.result.forEach(row => {
        var foodiv= document.getElementById('foods');
        //<img src="./imagem" alt="Prato" /> para adicionar imagens
        foodiv.innerHTML+=(`<div class="card-item">
            
            <h3>${row.Nome}</h3>
            <p>${row.Preparo}min</p>
            <p>${row.Decricao}</p>
            <div class="edita-exclui"><i class="fa-solid fa-pen"></i><i class="fa-solid fa-trash"></i></div>
            <button class="order-button">R$${row.Preco}</button>
            </div>`)
          
         });
}
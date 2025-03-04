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
    foodiv.innerHTML+=(`
        <div class="card-item">
            <div class="edita-exclui"><i class="fa-solid fa-pen" onclick='linkupdate(${row.ID})'></i><i class="fa-solid fa-trash" onclick='vanish("COMIDA", ${row.ID})'></i></div>
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
            window.location.href = "/";
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
        
        foodiv.innerHTML+=(`
            <div class="card-item">
            <div class="edita-exclui"> <i class="fa-solid fa-pen" onclick='linkupdate(${row.ID})'></i>
    <i class="fa-solid fa-trash" onclick='vanish("COMIDA", ${row.ID})'>
        
    </i></div>
            <h3>${row.Nome}</h3>
            <p>${row.Preparo}min</p>
            <p>${row.Decricao}</p>
            <button class="order-button">R$${row.Preco}</button></div>
`)
         });
}
async function vanish(table,id){
    const formData = {
        table: table,
        id:id
    };
    const response = await fetch('./delete', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
    });
    location.reload(true);
}
async function linkupdate(id){
    window.location.href = "editar.html?id="+id;
}
async function ConfUpdate() {
    var query = location.search.slice(1);
    var chaveValor = query.split('=');
    var ID = chaveValor[1];
    let formData = {
        table:'COMIDA',
        clausula:`ID=${ID}`
    };
    const response = await fetch('./where', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
    });

    const result = await response.json();
    elemento=result.query
    
    const tempo=document.getElementById("tempo")
    const preco=document.getElementById("preco")
    const nome=document.getElementById("nome")
    document.getElementById(elemento.Tipo).checked =true;
    const descricao = document.getElementById("descricao");
    const form=document.getElementById('form')
    tempo.value=elemento.Preparo;
    preco.value=elemento.Preco;
    nome.value=elemento.Nome;
    descricao.value=elemento.Decricao;
    radio=elemento.Tipo;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        formData={
            table:'COMIDA',
            valores:`Preparo=${tempo.value}, Preco=${preco.value}, Nome="${nome.value}", Tipo="${radio}", Decricao="${descricao.value}"`,
            ID:ID
        }
    
        const update = await fetch('./update', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formData)
        });
    
        window.location.href = "cardapio.html";
    })
}
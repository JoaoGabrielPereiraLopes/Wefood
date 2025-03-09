const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const sql = require('sqlite3').verbose();
const url = require('url');
const jwt = require("jsonwebtoken");
const { log } = require('console');
app.use(express.static(path.join(__dirname, '../public'), { extensions: ['html', 'css', 'js', 'ttf', 'jpeg', 'svg'] }));
app.use(express.json());
app.use(bodyParser.json({ limit: '512mb' }));


app.get('/cadastro_comidas', (req, res) => {
    res.sendFile(path.join(__dirname, path.join('../public/html', 'cardapio.html')));
})
app.get('/search.html', (req, res) => {
    res.sendFile(path.join(__dirname, path.join('../public/html', 'search.html')));

})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, path.join('../public/html', 'wefood.html')));
});

app.get('/wefoodestetica.css', (req, res) => {
    res.sendFile(path.join(__dirname, path.join('../public/html', 'wefoodestetica.css')));
});

app.get('/cardapio.html', (req,res)=>{
    res.sendFile(path.join(__dirname, path.join('../public/html', 'pratos.html')));
})

app.get('/editar.html', (req, res)=>{
    res.sendFile(path.join(__dirname, path.join('../public/html', 'editar.html')));
})

app.get('/cssgeral.css', (req,res)=>{
    res.sendFile(path.join(__dirname, path.join('../public/html', 'cssgeral.css')));
})

app.post('/get',(req,res)=>{
    const {table}=req.body
    banco=new sql.Database('../bd/WeFood.db',(err)=>{
        if(err){
          return console.error(err.message)
        }
        console.log('conexão bem sucedida')
    })
    banco.all(`SELECT * FROM ${table};`, (error,result) => {
        if (error) {
            console.error(`A query gerou o erro: ${error.message}`);
            return res.status(200).json({
                status: 'fail',
                message: 'Register failed',
                resultado: result
            });
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'Register successfully',
                result:result
            });
        }
    })
    banco.close()
})
app.post('/search',(req,res)=>{
    const {table,texto,atributo} = req.body;
    banco=new sql.Database('../bd/WeFood.db',(err)=>{
        if(err){
          return console.error(err.message)
        }
        console.log('conexão bem sucedida')
    })
    banco.all(`SELECT * FROM ${table} where ${atributo} LIKE "%${texto}%";`, (error, result) => {
        if (error) {
            console.error(`Erro na query: ${error.message}`);
            return res.status(500).json({
                status: 'fail',
                message: 'Erro ao buscar os dados.'
            });
        } 
        
        if (!result) {
            return res.status(404).json({
                status: 'failed',
                message: 'Nenhum dado encontrado.'
            });
        }
    
        return res.status(200).json({
            status: 'success',
            message: 'Dados recuperados com sucesso.',
            result: result
        });
    });
    
    banco.close()
})

app.post('/insert',(req,res)=>{
    const {table,valores}=req.body
    var str= valores
    banco=new sql.Database('../bd/WeFood.db',(err)=>{
        if(err){
          return console.error(err.message)
        }
        console.log('conexão bem sucedida')
    })
    let verifica=true
    str=str.replace(")", '')
    infos=str.split(',')
    console.log(infos)
    infos.forEach(element => {
        if(element.split('"').length>=2){
            element=element.split('"')[1]
            console.log(element)
        }
        if(!element){
            verifica=false
        }
    });
    if(!(table && verifica)){
        return res.status(200).json({
            status: 'failed',
            message: 'preenchimento incorreto'
        });
    }
    console.log(`INSERT INTO ${table} values ${valores};`)
    banco.run(`INSERT INTO ${table} values ${valores};`,(error)=>{
        if(error){
            console.error(`a query deu o erro: ${error}`)
            return res.status(200).json({
                status: 'failed',
                message: 'Register failed',
                error:error.message
            });
        }
        else{
            console.log('deu tudo certo executamos a query')
            return res.status(200).json({
                status: 'success',
                message: 'Register successfully'
            });
        }
    })
    banco.close()
})

app.post('/where',(req,res)=>{
    const {clausula,table} = req.body;
    banco=new sql.Database('../bd/WeFood.db',(err)=>{
        if(err){
          return console.error(err.message)
        }
        console.log('conexão bem sucedida')
    })
    console.log(`SELECT * FROM ${table} WHERE ${clausula};`)
    banco.get(`SELECT * FROM ${table} WHERE ${clausula};` , (error, result) => {
        if (error) {
            console.error(`A query gerou o erro: ${error.message}`);
            return res.status(200).json({
                status: 'fail',
                message: 'SELECT failed'
            });
        } else {
            console.log(result)
            return res.status(200).json({
                status: 'success',
                message: 'SELECT successfully',
                query: result
            });
        }
    })
    banco.close()
})

app.post('/update',(req,res)=>{
    const {table,valores,ID} = req.body;
    
    banco=new sql.Database('../bd/WeFood.db',(err)=>{
        if(err){
          return console.error(err.message)
        }
        console.log('conexão bem sucedida')
    })
    let verifica=true
    infos=valores.split(',')
    infos.forEach(element => {
        element=element.split('=')[1]
        if(element.split('"').length>=2){
            element=element.split('"')[1]
        }
        if(!element){
            verifica=false
        }
    });

    if(!(table && verifica && ID)){
        return res.status(200).json({
            status: 'failed',
            message: 'preenchimento incorreto'
        });
    }
    console.log(table,verifica,ID)

    banco.run(`UPDATE ${table} set ${valores} WHERE ID=${ID};`,(error)=>{
        if (error) {
            console.error(`A query gerou o erro: ${error.message}`);
            return res.status(200).json({
                status: 'fail',
                message: 'UPDATE failed'
            });
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'UPDATE successfully'
            });
        }
    })
    
    banco.close()
})
app.post('/delete',(req,res)=>{
    const {table,id} = req.body;
    banco=new sql.Database('../bd/WeFood.db',(err)=>{
        if(err){
          return console.error(err.message)
        }
        console.log('conexão bem sucedida')
    })
    banco.run(`DELETE FROM ${table} WHERE ID=${id};`,(error)=>{
        if (error) {
            console.error(`A query gerou o erro: ${error.message}`);
            return res.status(200).json({
                status: 'fail',
                message: 'delete failed'
            });
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'UPDATE successfully'
            });
        }
    })
    banco.close()
})
// Test do Oauth

app.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    
    if (username === "usuario" && password === "senha") {
      const user = { id: 1, name: "Usuário" };
      
      
      const token = jwt.sign(user, "chave_secreta", { expiresIn: "2h" });
  
      return res.json({ token });
    }
});
app.listen(7070, () => {
    console.log('Server started in the localhost 8080');
});
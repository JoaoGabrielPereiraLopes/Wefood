const express = require('express');
const path = require('path');
const app = express();
const formRouter = require('./form_send');
const bodyParser = require('body-parser');
const sql = require('sqlite3').verbose();
const url = require('url');
app.use(express.static(path.join(__dirname, '../public'), { extensions: ['html', 'css', 'js', 'ttf', 'jpeg', 'svg'] }));
app.use(express.json());
app.use(bodyParser.json({ limit: '512mb' }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, path.join('./public/html', 'wefood.html')));
});

app.get('/user', (req,res)=>{
    res.sendFile(path.join(__dirname, path.join('./public/html', 'user.html')));
})

app.get('/comida',(req,res)=>{
    res.sendFile(path.join(__dirname, path.join('./public/html', 'comida.html')));
})

app.get('/get_comidas',(req,res)=>{
    banco=new sql.Database('../bd/WeFood.db',(err)=>{
        if(err){
          return console.error(err.message)
        }
        console.log('conexão bem sucedida')
    })
    banco.get('SELECT * FROM COMIDA', (error) => {
        if (error) {
            console.error(`A query gerou o erro: ${error.message}`);
            return res.status(200).json({
                status: 'fail',
                message: 'Register failed'
            });
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'Register successfully'
            });
        }
    })
    banco.close()
})

app.post('/post_comidas',(req,res)=>{
    const {Preparo,Preco,Nome} = req.body;
    banco=new sql.Database('../bd/WeFood.db',(err)=>{
        if(err){
          return console.error(err.message)
        }
        console.log('conexão bem sucedida')
    })
    banco.run(`INSERT INTO COMIDA(Preparo,Preco,Nome) values(${Preparo},${Preco},'${Nome}')`,(error)=>{
        if(error){
            console.error(`a query deu o erro: ${error}`)
            return res.status(200).json({
                status: 'fail',
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

app.get('/info_comidas',(req,res)=>{
    const queryObject = req.query.ID;
    banco=new sql.Database('../bd/WeFood.db',(err)=>{
        if(err){
          return console.error(err.message)
        }
        console.log('conexão bem sucedida')
    })
    banco.get(`SELECT * FROM COMIDA WHERE ID = ${queryObject}`, (error, result) => {
        if (error) {
            console.error(`A query gerou o erro: ${error.message}`);
            return res.status(200).json({
                status: 'fail',
                message: 'SELECT failed'
            });
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'SELECT successfully',
                query: result
            });
        }
    })
    banco.close()
})

app.post('/update_comidas',(req,res)=>{
    const {Preparo,Preco,Nome,ID} = req.body;
    banco=new sql.Database('../bd/WeFood.db',(err)=>{
        if(err){
          return console.error(err.message)
        }
        console.log('conexão bem sucedida')
    })
    banco.run(`UPDATE COMIDA set Preparo=${Preparo},Preco=${Preco},Nome='${Nome}' WHERE ID=${ID})`,(error)=>{
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

app.post('/post_ingredientes',(req,res)=>{
    const {Nome} = req.body;
    banco=new sql.Database('../bd/WeFood.db',(err)=>{
        if(err){
          return console.error(err.message)
        }
        console.log('conexão bem sucedida')
    })
    banco.run(`INSERT INTO ingredientes(nome) VALUES('${Nome}')`,(error)=>{
        if (error) {
            console.error(`A query gerou o erro: ${error.message}`);
            return res.status(200).json({
                status: 'fail',
                message: 'Register failed'
            });
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'Register successfully'
            });
        }
    })
    banco.close()
})

app.post('/info_ingredientes',(req,res)=>{
    const queryObject = req.query.ID;
    banco=new sql.Database('../bd/WeFood.db',(err)=>{
        if(err){
          return console.error(err.message)
        }
        console.log('conexão bem sucedida')
    })
    banco.get(`SELECT * FROM Ingredientes WHERE ID=${queryObject}`,(error,result)=>{
        if (error) {
            console.error(`A query gerou o erro: ${error.message}`);
            return res.status(200).json({
                status: 'fail',
                message: 'Register failed',
            });
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'Register successfully',
                result: result
            });
        }
    })
    banco.close()
})

app.post('/search_ingredientes',(req,res)=>{
    const {Nome} = req.body;
    banco=new sql.Database('../bd/WeFood.db',(err)=>{
        if(err){
          return console.error(err.message)
        }
        console.log('conexão bem sucedida')
    })
    banco.get(`SELECT * FROM Ingredientes WHERE Nome LIKE '%${Nome}%'`,(error,result)=>{
        if (error) {
            console.error(`A query gerou o erro: ${error.message}`);
            return res.status(200).json({
                status: 'fail',
                message: 'Search failed',
            });
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'Search successfully',
                query: result
            });
        }
    })
    banco.close()
})

app.post('/search_comida',(req,res)=>{
    const {Nome} = req.body;
    banco=new sql.Database('../bd/WeFood.db',(err)=>{
        if(err){
          return console.error(err.message)
        }
        console.log('conexão bem sucedida')
    })
    banco.get(`SELECT * FROM COMIDA WHERE Nome LIKE '%${Nome}%'`,(error,result)=>{
        if (error) {
            console.error(`A query gerou o erro: ${error.message}`);
            return res.status(200).json({
                status: 'fail',
                message: 'Search failed',
            });
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'Search successfully',
                query: result
            });
        }
    })
    banco.close()
})

app.post('/insert_intolerancia',(req,res)=>{
    const {Nome,ingrediente} = req.body;
    banco=new sql.Database('../bd/WeFood.db',(err)=>{
        if(err){
          return console.error(err.message)
        }
        console.log('conexão bem sucedida')
    })
    banco.get(`SELECT ID FROM COMIDA WHERE Nome ='${ingrediente}'`,(error,result)=>{
        if (error) {
            console.error(`A query gerou o erro: ${error.message}`);
            return res.status(200).json({
                status: 'fail',
                message: 'Search failed',
            });
        } else {
            banco.run(`INSERT INTO intolerancia(Nome,Ingredientes) VALUES('${Nome}',${result.ID})`,(error)=>{
                if (error) {
                    console.error(`A query gerou o erro: ${error.message}`);
                    return res.status(200).json({
                        status: 'fail',
                        message: 'Register failed',
                    });
                } else {
                    return res.status(200).json({
                        status: 'success',
                        message: 'Register successfully',
                    });
                }
            })
        }
    })
})
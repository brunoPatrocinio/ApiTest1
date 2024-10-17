let express = require('express');
let app = express();
const CarroDB = require('./CarroDB');
let bodyParser = require('body-parser');

//config para ler dados do post por form-urlencoded e application/json
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send("API dos Carros");
});

//get em rota /carros
app.get('/carros', function(req, res){
    //res.send("Lista de todos os carros aqui.");
    CarroDB.getCarros(function(carros){
        res.json(carros);
    });
});

app.get('/carros/:id(\\d+)', function(req, res){
    let id = req.params.id;
    CarroDB.getCarrosById(id, function(carro){
        res.json(carro);
    });
});

//delete
app.delete('/carros/:id(\\d+)', function(req, res){
    let id = req.params.id;
    console.log("deletar carro " + id);
    CarroDB.deleteById(id, function(affectedRows){
        res.json({MSG: 'Carro deletado com sucesso. '});
    });
});

//get em carros/esportivos luxo ou classicos
app.get('/carros/:tipo', function(req, res){
    let tipo = req.params.tipo;
    CarroDB.getCarrosByTipo(tipo, function(carros){
        res.json(carros);
    });
    //res.send("Lista dos carros: " + tipo);
});

//post para salvar um carro
app.post('/carros', function(req, res){
    //carro enviado em json
    let carro = req.body;
    CarroDB.save(carro, function(carro){
        res.json(carro);
    });
});

//put para atualizar um carro
app.put('/carros', function(req, res){
    let carro = req.body;
    CarroDB.update(carro, function(carro){
        res.json({MSG: 'Carro atualizado com sucesso.'});
    });
});



let server = app.listen(3000, function(){
    let host = server.address().address;
    let port = server.address().port;
    console.log("Servidor iniciado em http://%s:%s", host, port);
});
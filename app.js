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

//get em carros/esportivos
app.get('/carros/:tipo', function(req, res){
    let tipo = req.params.tipo;
    CarroDB.getCarrosByTipo(tipo, function(carros){
        res.json(carros);
    });
    //res.send("Lista dos carros: " + tipo);
});

let server = app.listen(3000, function(){
    let host = server.address().address;
    let port = server.address().port;
    console.log("Servidor iniciado em http://%s:%s", host, port);
});
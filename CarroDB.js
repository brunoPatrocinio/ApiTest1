var mysql = require('mysql');
class CarroDB{
    static connect(){
        var connection = mysql.createConnection({
            host:"localhost",
            user: "root",
            password: "",
            database: "livro"
        });
        //conecta no db
        connection.connect();
        return connection;
    }
    //retorna lista de carros do banco
    static getCarros(callback){
        let connection = CarroDB.connect();
        //cria a consulta.
        let sql = "select * from carro";
        let query = connection.query(sql, function(error, results, fields){
            if(error){
                throw error;
            }
            //retorna os dados pela função de callback
            callback(results);
        });
        console.log(query.sql);
        connection.end();
    }

    static getCarrosByTipo(tipo, callback){
        let connection = CarroDB.connect();
        //consulta
        let sql = "select id,nome,tipo from carro where tipo = '" + tipo + "'";
        let query = connection.query(sql, function(error, results, fields){
            if(error){
                throw error;
            }
            callback(results);
        });
        console.log(query.sql);
        //fecha a conexao
        connection.end();
    }
}

module.exports = CarroDB;
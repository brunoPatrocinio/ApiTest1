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

    //retorna lista de carros.
    static getCarrosById(id, callback){
        let connection = CarroDB.connect();
        //consulta
        let sql = "select * from carro where id=?";
        let query = connection.query(sql, id, function(error, results, fields){
            if(error){
                throw error;
            }
            if(results.length == 0){
                console.log("Nenhum carro encontrado");
            }
            //encontrou
            let carro = results[0];
            callback(carro);
        });
        console.log(query.sql);
        //fecha a conn
        connection.end();
    }
    //salva um carro no banco.
    //recebe o json com os dados do carro como parametro.

    static save(carro, callback){
        let connection = CarroDB.connect();
        //insere
        let sql = "insert into carro set ? ";
        let query = connection.query(sql, carro, function(error, results, fields){
            if(error){
                throw error;
            }
            //atualiza o objeto carro do parametro com o id inserido.
            carro.id = results.insertId;
            //retorna o carro pela func de callback.
            callback(carro);
        });
        console.log(query.sql);
        connection.end();
    }

    //atualiza um carro no banco de dados
    static update(carro, callback){
        let connection = CarroDB.connect();
        let sql = "update carro set ? where id = ?";
        //id do carro para atualizar
        let id = carro.id;
        let query = connection.query(sql, [carro, id], function(error, results, fields){
            if(error){
                throw error;
            }
            callback(carro);
        });
        console.log(query.sql);
        connection.end();
    }
    //deleta um carro
    static deleteById(id, callback){
        let connection = CarroDB.connect();
        let sql = "delete from carro where id = ?";
        let query = connection.query(sql, id, function(error, results, fields){
            if(error){
                throw error;
            }
            callback(results.affectedRows);
        });
        console.log(query.sql);
        connection.end();
    }
};

module.exports = CarroDB;
const sql = require('mssql');
const dbconfig = require('../dao/conexao');
var pool = sql.connect(dbconfig);

class rota {
    contrutor( nome, metodo ) {
        this.nome = nome;
        this.metodo = metodo;
    }  


/*
    sql.connect(dbconfig).then(pool => {
                        
        return pool.request()
        .input('ic_parametro', sql.Int, 0)
        .input('nm_identificacao_api', sql.VarChar(8000), '')
        .input('cd_api', sql.Int, 0)        
        .execute('pr_consulta_api')

    }).then(result => {
        console.dir(result.recordset)
        //return result.recordset;
    }).catch(err => {
      // ... error checks
    });        
*/
         
    buscaRota() {
       return new Promise( function(resolve, reject){
         let conn;
         sql.connect(dbconfig)
         .then( function(c) {
             console.dir('Conectado ao Banco de dados');

             conn = c;

             return conn.request()
             .input('ic_parametro', sql.Int, 0)
             .input('nm_identificacao_api', sql.VarChar(8000), '')
             .input('cd_api', sql.Int, 0)        
             .execute('pr_consulta_api')         
           }
         ).then( function(result){
             console.dir('executado-resultado:');
             resolve(result.recordset);
             //console.dir(result.recordset);
             
         },
         function (err) {
            console.log('erro',err);
            reject(err);
         }
         ).then( function() {
            if (conn) {
              return conn.close();
            }
         }).then( function() {
            console.dir('conexão fechada'); 
         }).catch(function (err) {
             console.log('erro ao fechar a conexão:',err);
         });
       } );
    }   
}

module.exports = rota;
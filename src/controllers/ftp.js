var Client = require('ftp');
var fs     = require('fs')

var ListaDiretorios = function (path){
    
    var listaRetorno = []
    var config = {
        host: 'ftp.gbsnet.com.br',
        port: 21,
        user: 'gbsnet1',
        password: 'Gbstec@20152015'    
    }
    if (!path) {
        list = [{message: 'sem dados'}]
    }
    else
    {        
        var c = new Client();
        c.on('ready', function() {

            //-->> Lista os diretórios
            c.list(path, function(err, list) {
              if (err) throw err;                                
              listaRetorno = list;
              c.end();
              console.dir('listaRetorno',listaRetorno);
              
            });
        });
        c.connect(config);
    }
    return listaRetorno; 
    
}

module.exports = ListaDiretorios;
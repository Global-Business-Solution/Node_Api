const sql = require('mssql');
const dbconfig = require('./conexao');

var rotap = [];

 
function getRota() {    
    rotap = ['Registro', 'Empresa', 'User', 'Modulo'];

    console.dir('rotas: '+rotap);
    return rotap
    };


module.exports = getRota;


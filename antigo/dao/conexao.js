'use strict';

const sql = require('mssql');

//Conexão com o Banco de Dados
const dbconfig = {
   user: 'sa',
   password: 'sql@127',
   server: '186.202.42.2', // You can use 'localhost\\instance' to connect to named instance
   database: 'EGISADMIN',
   port: 1433,
   connectionTimeout: 150000,
   options: {
    enableArithAbort: false,
    encrypt: false
    }    
};


module.exports = dbconfig;


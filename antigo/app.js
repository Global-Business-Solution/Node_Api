'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const router = express.Router();

/*
(async function () {
   try {
  
       // Stored procedure
       let pool = await sql.connect(dbconfig)
       let result2 = await pool.request()
       .input('ic_parametro', sql.Int, 0)        
       .input('nm_identificacao_api', sql.VarChar(60), '')        
       .input('cd_api', sql.Int, 0)        
       .execute('pr_consulta_api')
       dados = result2                        
       console.dir(result2)
   } catch (err) {
       // ... error checks
   }
})()

sql.on('error', err => {
   // ... error handler
})
*/

//Carregando as Rotas
const indexRoutes = require('../src/routes/index');
const indexAdmin = require('./admin-route');

//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
//

app.use('/', indexRoutes);
app.use('/ApiAdmin', indexAdmin);

module.exports = app;


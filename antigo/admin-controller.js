'use strict'

const sql = require('mssql');

const dbconfig = require('./dao/conexao');
const express = require('express');

//
var recurso = '';
//

var dados = {};


exports.get = (req, res, next) => {

    recurso = req.url.replace("/", "");

    //console.dir(req.url);
    //console.dir(name)

    dadosApi(recurso)       

    //dados = recurso
   
    res.status(200).send(recurso + '-' + dados);

//funciona    
 //   res.status(200).send(config);

 };

exports.post = (req, res, next) => {
    res.status(201).send(req.body);
 };   

exports.put = (req, res, next) => {
    const id = req.params.id;
    //console.dir(req.query.name);
    res.status(201).send( {id: id, 
                           item: req.body });
 };   

 exports.delete = (req, res, next) => {
    res.status(200).send( req.body );
 };


function dadosApi( nomeRecurso ){

    sql.on('error', err => {
        // ... error handler
        console.dir(err)
    })
     
    sql.connect(dbconfig).then(pool => {
        
        // Stored procedure
        
        return pool.request()
            .input('nm_parametro', sql.VarChar(8000), nomeRecurso)
            .execute('pr_api')
    }).then(result => {
         dados = JSON.parse(JSON.stringify(result.recordset[0].jsonResultado));
         //console.log(dados)
         sql.close();
    }).catch(err => {
        // ... error checks
        console.dir('erro: '+err)
        sql.close();
    })   

}
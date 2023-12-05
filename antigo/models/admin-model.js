'use strict';

const sql = require('mssql');

const Schema = sql.Schema;

const schema = new Schema({
    
});

module.exports = sql.model('Registro',schema);

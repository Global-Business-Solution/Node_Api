'use strict';

const utils = require('../utils');

const register = async ( { sql, getConnection } ) => {
    const sqlQueries = await utils.loadSqlQueries( 'events' );

    const getEvents = async userId  => {
        const cnx = await getConnection();
        const request = await cnx.request();
        request.input( 'userId', sql.VarChar(50), userId );
        return request.query( sqlQueries.getEvents );
    };

    const getApi = async (api, bod, rot, met) => {
        const cnx = await getConnection();
        const request = await cnx.request()       
        request.input( 'api', sql.VarChar(8000), api );  
        request.input( 'bod', sql.Text, bod );
        request.input( 'rot', sql.Int, rot);
        request.input( 'met', sql.VarChar(80), met);
        

       // console.log(bod);

       // console.log(rot);  
       // console.log(api);
       //console.log(request);
       //console.log(request.query( sqlQueries.getApi ));

        return request.query( sqlQueries.getApi );
    };

    const getApiEspecial = async (api, bod, rot, met) => {
        const cnx = await getConnection();
        const request = await cnx.request()        
        request.input( 'api', sql.VarChar(8000), api );       
        request.input( 'bod', sql.VarChar(8000), bod );
        request.input( 'rot', sql.Int, rot);  
        request.input( 'met', sql.VarChar(80), met);        
        
        //console.log(rot);      
        //console.log(api);

        //console.log(bod);

        

        return request.query( sqlQueries.getApiEspecial );
    };

    return {
        getEvents,
        getApi,
        getApiEspecial
        
    };
    
};

module.exports = { register };

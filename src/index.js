"use strict";

const config = require('../src/config');
const server = require( "../src/server" );

const startServer = async () => {
	try {
	    const app = await server( config );
		await app.start();
		console.log( `Servidor em Operação no endereço https://${ config.host }:${ config.port }` );
		//console.log(server.version);
		//console.log('Server running on %s', server.info.uri);	
	}
	catch ( err ) {
		console.log( "Erro na inicialização do Servidor",err );

	}
};

startServer();


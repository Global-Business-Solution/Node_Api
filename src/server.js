"use strict";

const Hapi = require( "@hapi/hapi" );
const plugins = require('./plugins');
const routes = require( "./routes" );
const cors   = require('hapi-cors');


const app = async config => {
	const { host, port } = config;

//	const server = Hapi.server( { host, port, routes: { cors: true }
//								} );
								
	const server = Hapi.server( { host, port,
		routes: {
			cors: true 
		}
	 } );
	
	server.app.config = config;

    await plugins.register( server );
	await routes.register( server );

	return server;

};

module.exports = app;
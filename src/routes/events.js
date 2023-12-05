"use strict";

//const axios = require("axios");
const sql = require("mssql");
const config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  options: {
    encrypt: true,
  },
};

module.exports.register = async (server) => {
  var rotas = [];
  var rota = 0;
  //var routes = [];

  const buscaRota = async () => {
    try {
      await sql.connect(config);
      const request = new sql.Request();
      const result = await request.execute(
        "[EGISADMIN].[dbo].[pr_consulta_api]",
        {
          ic_parametro: 0,
          nm_identificacao_api: "",
          cd_api: 0,
          cd_modulo: null,
          dt_inicial: null,
          dt_final: null,
          cd_procedimento: null,
          cd_tabela: null,
        }
      );
      return result;
    } catch (error) {
      console.error("Erro ao executar a procedure:", err);
    } finally {
      await sql.close();
    }

    //try {
    //  return await axios.get(
    //    "http://localhost:8080/Datasnap/rest/TdmAdmin/ApiAdmin/"
    //  );
    //} catch (err) {
    //  console.log("erro:", err);
    //}
  };

  const getRota = async () => {
    const rot = await buscaRota();
    rotas = rot.recordset;
    var s = {};

    for (rota in rotas) {
      console.log(rotas[rota].nm_identificacao_api + "-" + rotas[rota].cd_api);

      if (rotas[rota].cd_tipo_retorno == 0) {
        s = {
          method: rotas[rota].nm_metodo,
          config: {
            cors: {
              //origin: ["egisnet.com.br"],
              origin: ["*"],
              //headers: ["Access-Control-Allow-Methods","Access-Control-Allow-Headers", "Access-Control-Allow-Origin","Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"],
              //additionalHeaders: ["Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization"],
              //AccessControlAllowMethods: ["*"]
            },
          },
          path:
            "/" + rotas[rota].nm_identificacao_api + rotas[rota].nm_parametro,
          handler: async (request, h) => {
            try {
              const db = request.server.plugins.sql.client;
              const api = request.url.pathname;
              const bod = JSON.stringify(request.payload);
              const rot = 0;

              //rotas[rota].cd_api;
              //const met = rotas[rota].nm_metodo;

              const met = request.method;

              const res = await db.events.getApi(api, bod, rot, met);

              return res.recordset;
            } catch (err) {
              console.log("erro", err);
            }
          },
        };
      } else {
        s = {
          method: rotas[rota].nm_metodo,
          config: {
            cors: {
              //origin: ["http://www.egisnet.com.br"],
              origin: ["*"],
              // headers: ["Access-Control-Allow-Methods:[GET, POST, PATCH, PUT, DELETE, OPTIONS]","Access-Control-Allow-Headers", "Access-Control-Allow-Origin","Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"],
              // additionalHeaders: ["Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization"],
              // AccessControlAllowMethods: ["GET, POST, PATCH, PUT, DELETE, OPTIONS"],
              //credentials: true
            },
          },
          path:
            "/" + rotas[rota].nm_identificacao_api + rotas[rota].nm_parametro,
          handler: async (request, h) => {
            try {
              const db = request.server.plugins.sql.client;
              const api = request.url.pathname;
              const bod = JSON.stringify(request.payload);
              const rot = 0;
              //rotas[rota].cd_api;
              // const met = rotas[rota].nm_metodo;
              const met = request.method;

              const res = await db.events.getApiEspecial(api, bod, rot, met);

              //return res.recordset;
              return JSON.parse(
                JSON.parse(JSON.stringify(res.recordset[0].data))
              );
            } catch (err) {
              console.log("erro", err);
            }
          },
        };
      }

      //routes.push( s );
      server.route(s);
    }

    //Rotas

    /*
      routes = [      { method: 'GET',
                   path: '/'+rotas[3].nm_identificacao_api,
                   handler: async (request, h) => { return 'xuxa' }
                 }];

      /*

   

    };


      /*
      routes = [      { method: 'GET',
                   path: '/User',
                   handler: async (request, h) => { return 'user' }
                 },
                { method: 'GET',
                   path: '/'+rotas[0].nm_identificacao_api,
                   handler: async (request, h) => { return 'registro' }
                 },
           
                 { method: 'GET',
                   path: '/rotas',
                   handler: async (request, h) => { return 'rotas' }
                 },
                 { method: 'GET',
                   path: '/gbs',
                   handler: async (request, h) => { return 'lista das apis disponíveis' }
                 }
                ];


                for (var route in routes) {
                    
                    server.route( routes[route] );
            
                };
         */
  };

  getRota();

  /*
    async request => {
        try {
          const db = request.server.plugins.sql.client;
          const userId = '113';
          const res = await db.events.getEvents( userId );
          
          return res.recordset;

        } catch( err ){
            console.log('erro',err);
        }

    } 
    server.route( {
        method: 'GET',
        path: '/api/events',
        handler: 
    });
   */
};

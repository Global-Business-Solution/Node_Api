'use strict';

const api = require('./api');
const axios = require('axios');
const rotas = require('./rotas');
const { request } = require('http');
const { rejects } = require('assert');
const { fstat } = require('fs');
const ftp = require('../controllers/ftp')
//const auth = require('./auth');

module.exports.register = async server => {
    
    await api.register( server );
    await rotas.register( server );
 //   await auth.register( server );

    server.route( {
        method: 'GET',
        path: '/',
        handler: async ( request, h) => {
            return h.view( 'index', 
            { title: 'Servidor de API/HAPPI - GBS 2022 - EGIS',
              mensagem: 'versão: 1.0.0',
              dados: '',
              site: 'www.gbstec.com.br'
            });
        }
    });

    // teste de Upload de arquivos - Mateus 
    server.route({
        method: 'GET',
        path: '/upload',
        handler: async ( request, h) => {
            return h.view( 'index', 
            { title: 'Teste api GBS Arquivo',
              mensagem: 'versão: 1.0.0',
              dados: '',
              site: 'www.gbstec.com.br'
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/uploadFile',
        options: {
            payload: {
                maxBytes:209715200,
                parse: true,
                output: 'file',
            },
            handler: async (req, h) => {
                console.log(req.payload);
                return h.response(req.payload);
            }
        }
    });
   
    server.route( {
        method: 'GET',
        path: '/Doc',
        handler: async ( request, h) => {

                var resultado = [];
                var retorno = {};

                const listApi = async () => {
                    try {
                        return await axios.get('http://localhost:8080/Datasnap/rest/TdmAdmin/ApiAdmin/')
                      } catch (err) {
                          console.log('erro:', err)
                      }
                  };

                const getDoc = async() => {
  
                    const doc = await listApi()
                
                    resultado = doc.data;
                                    
                };

            

            retorno = { 
                title: 'GBS Tecnologia e Consultoria',
                site: 'www.gbstec.com.br',
                mensagem: "Documentação das APi's Disponíveis:",
                dados: await getDoc()                                     
                
               };

            console.log(retorno);

            return h.view( 'lista', retorno );
        }
    });

};


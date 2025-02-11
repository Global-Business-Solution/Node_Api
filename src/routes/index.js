'use strict';

const api = require('./api');
const axios = require('axios');
const rotas = require('./rotas');
const { request } = require('http');
const { rejects } = require('assert');
const { fstat } = require('fs');
const ftp = require('../controllers/ftp')
const Path = require('path')

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
        path: '/uploadfile',
        options: {
            payload: {                           
                parse: false,
                output: 'file',
                multipart: true,
                allow: 'multipart/form-data'
            },
            handler: async (request, h) => {                
                const file = request.payload;
                console.log('file',file)
                const filename = file.path;                
                console.log('filename',filename)
                return h.view( 'index', 
                    { title: 'Teste api GBS Arquivo',
                    mensagem: 'versão: 1.0.0',
                    dados: '',
                    site: 'www.gbstec.com.br'
                    });
                // Save file to uploads folder
                /*
                const filePath = Path.join(__dirname, 'uploads', filename);
                console.log('dirname', __dirname )
                console.log('filePath', filePath )                
                return new Promise((resolve, reject) => {
                    file.pipe(require('fs').createWriteStream(filePath));
                    file.on('end', (err) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve({ message: 'File uploaded successfully', filename: filename });
                    });
                });*/
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


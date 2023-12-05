'use strict';

const express = require('express');
const controller = require('../controllers/admin-controller');
const rota = require('../dao/rotas');

const router = express.Router();
var xrota = new rota;

var rotas = xrota.buscaRota();

var x = rotas.length;

//
//console.log(x);
//
console.log('r',rotas);

 // for (var i = 0; i<rotap.length; i++){
//    console.log(rotas[i])
//  }

//console.dir(rotap.length)

//montando as Rotas dinâmicas//

var route = ''  

for (var i = 0; i<rotas.length; i++){
  
    route = '/'+rotas[i]

    //console.dir('r',route)

  //Rotas
  router.get(route, controller.get);
  router.post(route, controller.post);
  router.put(route+'/:id', controller.put);
  router.delete(route, controller.delete);
  //

}  

module.exports = router;



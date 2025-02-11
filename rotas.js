const axios  = require('axios');

var rotas = [];
var dados = [];

const buscaRota = async () => {
    try {
    //return await axios.get('http://localhost:8080/Datasnap/rest/TdmAdmin/ApiAdmin/')
    return await axios.get('http://186.202.42.3:8080/Datasnap/rest/TdmAdmin/ApiAdmin/')
    } catch (err) {
        console.log('erro:', err)
    }
}

const getRota = async() => {
    const rot = await buscaRota()

    rotas = rot.data

    //console.log(typeof(rotas))
    //console.log(rotas);
    
    //var x = rotas.length;
    
    //console.log(x);
    
    //console.log( rot.data);

    for (rota in rotas) {
        console.log( rotas[rota].nm_identificacao_api );
      };     
    
}

getRota();



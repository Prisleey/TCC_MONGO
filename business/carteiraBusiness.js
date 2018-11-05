let CarteiraModel = require('../model/carteiraModel');
let ObjectId = require('mongoose').Types.ObjectId;


exports.criarCarteira = function(carteiraTemp) {

    console.log(carteiraTemp);
    return new Promise(function(resolve, reject) {
        console.log("CHEGOU AQUI ANTES DA CARTEIRA");
        let carteira = new CarteiraModel(carteiraTemp);
        carteira.save(function(err) {
            if(err) {
                reject({status: false, erro: err});
            } else {
                resolve({status: true});
            }
        });
    });
}

exports.consultarCarteira = function(id_usuario) {
    return new Promise(function(resolve, reject) {
        console.log("consultando a carteira!");
        CarteiraModel.find({
            idUsuario : id_usuario
        }, function(erro, carteira) {
            if(carteira) {
                resolve({'status' : true, 'carteira' : carteira});
            } else {
                reject({'status' : false, 'erro' : erro});
            }
        });
    });
}


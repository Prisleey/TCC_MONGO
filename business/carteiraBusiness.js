let CarteiraModel = require('../model/carteiraModel');
let ObjectId = require('mongoose').Types.ObjectId;

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
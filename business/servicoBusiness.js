let EstudioModel = require('../model/estudioModel');

exports.buscar = function(data) {
    return new Promise(function(resolve, reject) {
        EstudioModel.find({
            "$or": [{
                nomeEstudio: {'$regex': data.nomeBusca, '$options': 'i'}
            }, {
                cidade: {'$regex': data.local, '$options': 'i'}
            }, {
                estado: {'$regex': data.local, '$options': 'i'}
            }, {
                bairro: {'$regex': data.local, '$options': 'i'}
            }]
        }, {
            nomeEstudio: 1,
            cidade: 1,
            estado:1,
            bairro: 1
        }, function(erro, resultado){
            if(resultado){
                resolve({status : true, 'resultado': resultado});
            }else{
                reject({status :false, erro: erro});
            }
        })
    });
}
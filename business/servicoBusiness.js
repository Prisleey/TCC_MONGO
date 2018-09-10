let EstudioModel = require('../model/estudioModel');
let TipoServicoModel = require('../model/tipoServicoModel');

exports.buscar = function(data) {
    return new Promise(function(resolve, reject) {

        if(data.nomeBusca.trim() != "" && data.local.trim() != "") {

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
                bairro: 1,
                telefone: 1,
                rua: 1,
                salas: 1
            }, function(erro, resultado){
                if(resultado){
                    resolve({status : true, 'resultado': resultado});
                }else{
                    reject({status :false, erro: erro});
                }
            });
        } else if(data.nomeBusca != "" && data.local == "") {
            EstudioModel.find({
                "$or": [{
                    nomeEstudio: {'$regex': data.nomeBusca, '$options': 'i'}
                }]
            }, {
                nomeEstudio: 1,
                cidade: 1,
                estado:1,
                bairro: 1,
                telefone: 1,
                rua: 1,
                salas: 1
            }, function(erro, resultado){
                if(resultado){
                    resolve({status : true, 'resultado': resultado});
                }else{
                    reject({status :false, erro: erro});
                }
            });
        } else if(data.nomeBusca == "" && data.local != "") {
            EstudioModel.find({
                "$or": [{
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
                bairro: 1,
                telefone: 1,
                rua: 1,
                salas: 1
            }, function(erro, resultado){
                if(resultado){
                    resolve({status : true, 'resultado': resultado});
                }else{
                    reject({status :false, erro: erro});
                }
            });
        } else {
            EstudioModel.find({
            }, {
                nomeEstudio: 1,
                cidade: 1,
                estado:1,
                bairro: 1,
                telefone: 1,
                rua: 1,
                salas: 1
            }, function(erro, resultado){
                if(resultado){
                    resolve({status : true, 'resultado': resultado});
                }else{
                    reject({status :false, erro: erro});
                }
            });
        }
    });
}

exports.consultarServicos = function(id_estudio) {
    return new Promise(function(resolve, reject) {

        TipoServicoModel.find({_id: data
        }, {
            _id: 1,
            nomeEstudio: 1,
            descricao: 1,
            salas: 1
        }, function(erro, servico) {
            if(servico) {
                resolve({status : true, servico : servico});
            } else {
                reject({status : false, erro : erro});
            }
        });
    });
}
let EstudioModel = require('../model/estudioModel');
let ServicoModel = require('../model/servicoModel');
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
                }],
                $where:'this.salas.length>0'
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
                }],
                $where:'this.salas.length>0'
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
                }],
                $where:'this.salas.length>0'
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
                $where:'this.salas.length>0'
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

        ServicoModel.find({_id: data
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

exports.consultarTipoDeServicoPorTipoDeUsuario = function(idTipoUsuario) {
    return new Promise(function(resolve, reject) {
        TipoServicoModel.find({
            "idTpUsuario": idTipoUsuario
        }, {
            "nomeTpServico": 1,
            "idTpUsuario": 1
        }, function(erro, result) {
            if(result) {
                resolve({status : true, tiposServico: result});
            } else {
                reject({status : false, erro : erro});
            }
        });
    });
}

exports.cadastrarServicos = function(servico) {
    return new Promise(function(resolve, reject) {
        /*ServicoModel.findOne({

        }, function(erro, resultado){
            if(resultado){
                reject({status :false, erro: "erro"});
            }else{*/
                ServicoModel.save(function(err) {
                    if(err) {
                        reject({status: false, erro: err});
                    } else {
                        resolve({status: true, 'servico': servico});
                    }
                });
          /*  }
        });*/
    });
}
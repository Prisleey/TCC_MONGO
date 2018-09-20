let EstudioModel = require('../model/estudioModel');
let UsuarioModel = require('../model/usuarioModel');
let TipoUsuarioModel = require('../model/tipoUsuarioModel');
let ServicoModel = require('../model/servicoModel');
let TipoServicoModel = require('../model/tipoServicoModel');

exports.buscar = function(data) {
    return new Promise(function(resolve, reject) {

        if(data.who.trim() == "2") {
            console.log('if 1');
            TipoUsuarioModel.aggregate([
                { $lookup: { "from": "Usuario", "localField": "_id", "foreignField": "tipo", "as": "User" }},
                { $match : {
                    idTpUsuario : parseInt(data.who),

                    "$or": [{'User.nome': {'$regex': data.nomeBusca, '$options': 'i'}
                    },{
                        'User.cidade': {'$regex': data.local, '$options': 'i'}
                    }, {
                        'User.estado': {'$regex': data.local, '$options': 'i'}
                    }, {
                        'User.bairro': {'$regex': data.local, '$options': 'i'}
                    }]
                }},
                { $project : {
                    '_id':1,
                    'idTpUsuario':1,
                    'desc':1,
                    'User._id':1,
                    'User.nome':1,
                    'User.login':1,
                    'User.email':1,
                    'User.senha':1,
                    'User.cidade': 1,
                    'User.estado':1,
                    'User.bairro': 1,
                }
            }], function(erro, resultado){
                if(resultado){
                    resolve({status : true, 'resultado': resultado});
                }else{
                    reject({status :false, erro: erro});
                }
            });
        } else if(data.who.trim() == "3") {
            console.log('if 2');
            TipoUsuarioModel.aggregate([
                { $lookup: { "from": "Usuario", "localField": "_id", "foreignField": "tipo", "as": "User" }},
                { $match : {
                    idTpUsuario : parseInt(data.who),

                    "$or": [{'User.nome': {'$regex': data.nomeBusca, '$options': 'i'}
                    },{
                        'User.cidade': {'$regex': data.local, '$options': 'i'}
                    }, {
                        'User.estado': {'$regex': data.local, '$options': 'i'}
                    }, {
                        'User.bairro': {'$regex': data.local, '$options': 'i'}
                    }]
                }},
                { $project : {
                    _id:1,
                    idTpUsuario:1,
                    desc:1,
                    'User._id':1,
                    'User.nome':1,
                    'User.login':1,
                    'User.email':1,
                    'User.senha':1,
                    'User.cidade': 1,
                    'User.estado':1,
                    'User.bairro': 1,
                }
            }], function(erro, resultado){
                if(resultado){
                    resolve({status : true, 'resultado': resultado});
                }else{
                    reject({status :false, erro: erro});
                }
            });
        } else if(data.who.trim() == "4") {
            console.log('if 3');
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

//bulk insert
exports.cadastrarServicosBulk = function(servicos) {
    return new Promise(function(resolve, reject) {
        ServicoModel.collection.insert(servicos, function(err) {
            if(err) {
                reject({status: false, erro: err});
            } else {
                resolve({status: true, 'servicos': servicos});
            }
        });
    });
}
let UsuarioModel = require('../model/usuarioModel');
let TipoUsuarioModel = require('../model/tipoUsuarioModel');
let ObjectId = require('mongoose').Types.ObjectId;

exports.listTipoUsuario = function() {
    return new Promise(function(resolve, reject) {

        TipoUsuarioModel.find({

        }, {
            _id: 1,
            idTpUsuario:1,
            desc: 1,
        }, function(erro, tipoUser) {
            //console.log('tipoUser>>>>>>>>>>>>> ',tipoUser);
            if(tipoUser) {
                resolve({status : true, tipos : tipoUser});
            } else {
                reject({status : false, erro : erro});
            }
        });
    });
}

exports.salvarUsuario = function(data) {
    return new Promise(function(resolve, reject) {
        let usuario = new UsuarioModel(data);

        UsuarioModel.findOne({
            "$or": [{
                login: data.login
            }, {
                email: data.email
            }]
        }, function(erro, resultado){
            if(resultado){
                reject({status :false, erro: "Usuário já tá cadastrado"});
            }else{
                usuario.save(function(err) {
                    if(err) {
                        reject({status: false, erro: err});
                    } else {
                        resolve({status: true, 'usuario': usuario});
                    }
                });
            }
        });
    });
}

exports.verificarUsuario = function(data) {
    return new Promise(function(resolve, reject) {

        UsuarioModel.aggregate([
            { $match : {login:data.login, senha:data.senha} },
            { $lookup:{from : "TipoUsuario", localField : "tipo", foreignField : "_id", as : "tipo"}},
            { $project: {
                _id:1,
                nome:1,
                login:1,
                email:1,
                senha:1,
                telefone:1,
                'tipo._id':1,
                'tipo.idTpUsuario':1,
                'tipo.desc':1,
            }}
        ]).exec(function(err, usuario){
            if(err){
                //reject(JSON.stringify(err));
                reject({status : false, erro: JSON.stringify(err)});
            } else {
                if(usuario.length == 0) {
                    resolve({status: false, 'usuario': usuario});
                }
                resolve({status: true, 'usuario': usuario});
            }
        });

        /*UsuarioModel.findOne({login:data.login, senha:data.senha}, function(err, usuario) {
            if(usuario) {
                resolve({status : true, 'usuario': usuario});
            } else {
                reject({status :false, erro: err});
            }
        });*/
    });
}

exports.consultaDadosUsuario = function(id) {
    return new Promise(function(resolve, reject) {
        UsuarioModel.findOne({
            _id : id
        }, function(erro, resultado) {
            if(resultado) {
                resolve({status: true, 'usuario': resultado});
            } else {
                reject({status: false, 'erro':erro});
            }
        });
    });
}

exports.consultarDadosUsuario = function(id_usuario) {
    return new Promise(function(resolve, reject) {

        UsuarioModel.aggregate([
            {
                $match: {
                    '_id': ObjectId(id_usuario)
                } //id user
            }, {
                $lookup: {
                    from: 'TipoUsuario',
                    localField: 'tipo',
                    foreignField: '_id',
                    as: 'results'
                }
            }
        ]).exec(function(err, result){
            if(err){
                reject({status: false, 'erro':erro});
            }else {
                resolve({status: true, 'usuario': result});
            }
        });
    });
}
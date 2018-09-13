let UsuarioModel = require('../model/usuarioModel');
let TipoUsuarioModel = require('../model/tipoUsuarioModel');

exports.listTipoUsuario = function() {
    return new Promise(function(resolve, reject) {
        let tpUser = new TipoUsuarioModel();

        TipoUsuarioModel.find({}, function(erro, tipoUser) {
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
                'tipo._id':1,
                'tipo.idTpUsuario':1,
                'tipo.desc':1,
            }}
        ]).exec(function(err, usuario){
            if(err){
                reject(JSON.stringify(err));
            }else {
                //console.log(usuario[0].tipo);
                resolve(usuario);
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
let UsuarioModel = require('../model/usuarioModel');

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
        UsuarioModel.findOne({login:data.login, senha:data.senha}, function(err, usuario) {
            if(usuario) {
                resolve({status : true, 'usuario': usuario});
            } else {
                reject({status :false, erro: err});
            }
        });
    });
}
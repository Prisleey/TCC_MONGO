let UsuarioModel = require('../model/usuarioModel');

exports.salvarUsuario = function(data) {
    return new Promise(function(resolve, reject) {
        let usuario = new UsuarioModel(data);

        usuario.save(function(err) {

            if(err) {
                reject({status: false, erro: 'bosta'});
            } else {
                resolve({status: true, 'usuario': usuario});
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
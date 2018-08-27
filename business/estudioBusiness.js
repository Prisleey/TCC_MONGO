let EstudioModel = require('../model/estudioModel');

exports.salvarEstudio = function(data) {
    return new Promise(function(resolve, reject) {
        let estudio = new EstudioModel(data);

        estudio.save(function(err) {

            if(err) {
                reject({status: false, erro: 'bosta'});
            } else {
                resolve({status: true, 'estudio' : estudio});
            }
        });
    });
}

exports.consultarEstudio = function(data) {
    return new Promise(function(resolve, reject) {
        EstudioModel.findOne({login : data.login, senha : data.senha}, function(err, usuario) {
            if(usuario) {
                resolve({status : true, 'estudio': estudio});
            } else {
                reject({status :false, erro: err});
            }
        });
    });
}
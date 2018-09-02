let EstudioModel = require('../model/estudioModel');

exports.salvarEstudio = function(data) {
    return new Promise(function(resolve, reject) {
        console.log(data);
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

exports.updateEstudio = function(id_estudio, data) {
    return new Promise(function(resolve, reject) {
        // let sala = new EstudioModel(data);
        // console.log('id_estudio:   ',id_estudio);
        EstudioModel.where({
            '_id' : id_estudio
        }).update({
            $push : { salas : data}
        },function (err) {
            if (err) {
                resolve(JSON.stringify(err));
            } else {
                resolve(JSON.stringify({
                    "status": true,
                    "message": "Sala salva com sucesso.",
                    "sala": data
                }));
            }
        });
    });
}

exports.consultarEstudio = function(data) {
    return new Promise(function(resolve, reject) {
        EstudioModel.find(function(err, estudios) {
            if(estudios) {
                resolve({status : true, 'estudios': estudios});
            } else {
                reject({status :false, erro: err});
            }
        });
    });
}

exports.detalheEstudio = function(data) {
    return new Promise(function(resolve, reject) {
        EstudioModel.find({_id: data
        }, {
            _id: 1,
            nomeEstudio: 1,
            descricao: 1,
            salas: 1
        }, function(err, estudio) {
            if(estudio) {
                resolve({status : true, 'estudio': estudio});
            } else {
                reject({status:false, erro: err})
            }
        });
    });
}
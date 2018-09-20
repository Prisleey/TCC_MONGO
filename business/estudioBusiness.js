let EstudioModel = require('../model/estudioModel');
let ObjectId = require('mongoose').Types.ObjectId;

exports.salvarEstudio = function(data) {
    return new Promise(function(resolve, reject) {
        let estudio = new EstudioModel(data);

        estudio.save(function(err) {
            if(err) {
                reject({status: false, erro: err});
            } else {
                resolve({status: true, 'estudio' : estudio});
            }
        });
    });
}

exports.updateEstudio = function(id_estudio, sala) {
    return new Promise(function(resolve, reject) {
        sala._id = ObjectId();
        let meuId = sala._id;
        console.log("OPA MEU ID " + sala._id);
        EstudioModel.findOneAndUpdate({'_id' : id_estudio}, {$push : { salas : sala}}, { new: true }, function (err) {
            if (err) {
                reject(JSON.stringify(err));
            } else {
                //let idSalaSalva = salaCallback.salas[salaCallback.salas.length-1]._id;
                resolve(JSON.stringify({
                    "status": true,
                    "message": "Sala salva com sucesso.",
                    "sala": sala,
                    "idSala": meuId
                }));
            }
        });
    });
}

exports.consultarEstudio = function(data) {
    return new Promise(function(resolve, reject) {
        console.log(data);
        EstudioModel.find({
            idUsuario : data
        }, function(err, estudios) {
            if(estudios) {
                resolve({status : true, 'estudios': estudios});
            } else {
                reject({status :false, erro: err});
            }
        });
    });
}

exports.detalheEstudio = function(id_estudio) {
    return new Promise(function(resolve, reject) {
        EstudioModel.findOne({
            _id: id_estudio
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

exports.detalhSala = function(id_estudio, id_sala) {
    return new Promise(function(resolve, reject) {
        EstudioModel.findOne({ // não será find eu acho
            _id: id_estudio,
            'salas._id': id_sala
        }, {
            'colunas':1
        }, function(err, estudio) {
            if(estudio) {
                resolve({status : true, 'estudio': estudio});
            } else {
                reject({status:false, erro: err})
            }
        });
    });
}
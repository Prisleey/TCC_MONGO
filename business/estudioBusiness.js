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

exports.detalheSala = function(id_estudio, id_sala) {
    return new Promise(function(resolve, reject) {
        EstudioModel.aggregate([
            { $unwind: { path: "$salas",preserveNullAndEmptyArrays: true } },
            { $match: {
                'salas._id': ObjectId(id_sala)}}, //id sala
            { $lookup: {
                from : "Servico",
                localField : "salas._id", //campo de Estudio
                foreignField : "idSala", //campo de Servico
                as : "servicoSala"}},
            { $project: {
                _id: 1,
                nomeEstudio: 1,
                'salas': 1,
                'servicoSala': 1
            }}
        ]).exec(function(err, servicoSala){
            if(err){
                reject(JSON.stringify(err));
            }else {
                console.log(JSON.stringify(servicoSala));
                resolve(servicoSala);
            }
        });
    });
}
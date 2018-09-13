let EstudioModel = require('../model/estudioModel');

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
        // let sala = new EstudioModel(data);
        EstudioModel.findOneAndUpdate(
            {'_id' : id_estudio},
            {$push : { salas : sala}},
            { new: true }
        , function (err) {
            if (err) {
                resolve(JSON.stringify(err));
            } else {
                //let idSalaSalva = salaCallback.salas[salaCallback.salas.length-1]._id;
                let idSalaSalva =
                resolve(JSON.stringify({
                    "status": true,
                    "message": "Sala salva com sucesso.",
                    "sala": sala,
                    "idSala": idSalaSalva
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

exports.detalheEstudio = function(data) {
    return new Promise(function(resolve, reject) {
        console.log(data);
        EstudioModel.find({_id: data
        }, {
            _id: 1,
            nomeEstudio: 1,
            descricao: 1,
            salas: 1
        }, function(err, estudio) {
            if(estudio) {
                console.log(estudio);
                resolve({status : true, 'estudio': estudio});
            } else {
                reject({status:false, erro: err})
            }
        });
    });
}
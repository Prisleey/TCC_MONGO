let AgendaModel = require('../model/agendaModel');

exports.consultarAgendamento = function(id_usuario) {
    return new Promise(function(resolve, reject) {

        AgendaModel.find({
            idUsuario : id_usuario
        }, function(erro, agendamentos) {
            if(agendamentos) {
                resolve({'status' : true, 'agendamentos' : agendamentos});
            } else {
                reject({'status' : false, 'erro' : erro});
            }
        });
    });
}

exports.consultarAgendamentoLookup = function(id_usuario) {
    return new Promise(function(resolve, reject) {

        AgendaModel.aggregate([
            { $match: {
                    'idUsuario': ObjectId(id_usuario)} //id user
            }, {
                $lookup: {
                    from: "Usuario",
                    localField: "idUsuario",
                    foreignField: "_id",
                    as: "usuario"
                }
            }, {
                $lookup: {
                    from: "Servico",
                    localField: "idServico",
                    foreignField: "_id",
                    as: "servico"
                }
            }, {
                $lookup: {
                    from: "Estudio",
                    localField: "idSala",
                    foreignField: "_id",
                    as: "sala"
                }
            }, {
                $project: {
                    dataAgendamento:1,
                    horario_inicio:1,
                    horario_fim:1,
                    'usuario.nome': 1,
                    'sala.nomeSala':1,
                    'sala.nomeEstudio':1,
                    'servico.nomeServico': 1
                }
            }
        ]).exec(function(err, result){
            if(err){
                reject(err);
            }else {
                //console.log('resultado agenda: ', result);

                resolve(result);
            }
        });
    });
}

exports.consultarAgendamento = function(id_usuario) {
    return new Promise(function(resolve, reject) {

        AgendaModel.aggregate([
            { $match: {
                    'idUsuario': ObjectId(id_usuario)} //id user
            }, {
                $lookup: {
                    from: "Usuario",
                    localField: "idUsuario",
                    foreignField: "_id",
                    as: "usuario"
                }
            }, {
                $lookup: {
                    from: "Servico",
                    localField: "idServico",
                    foreignField: "_id",
                    as: "servico"
                }
            }, {
                $lookup: {
                    from: "Estudio",
                    localField: "idSala",
                    foreignField: "_id",
                    as: "sala"
                }
            }, {
                $project: {
                    dataAgendamento:1,
                    horario_inicio:1,
                    horario_fim:1,
                    'usuario.nome': 1,
                    'sala.nomeSala':1,
                    'sala.nomeEstudio':1,
                    'servico.nomeServico': 1
                }
            }
        ]).exec(function(err, result){
            if(err){
                reject(err);
            }else {
                //console.log('resultado agenda: ', result);

                resolve(result);
            }
        });
    });
}

exports.agendar = function(info_agendamento) {
    return new Promise(function(resolve, reject) {
        agenda = new AgendaModel(info_agendamento);
        agenda.save(function(erro){
            if(erro) {
                reject({status: false, erro: erro});
            } else {
                resolve({status: true});
            }
        });
    });
}
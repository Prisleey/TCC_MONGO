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

exports.agendar = function(info_agendamento) {
    return new Promise(function(resolve, reject) {
        agenda = new AgendaModel(JSON.stringify(info_agendamento));
        agenda.save(function(erro){
            if(err) {
                reject({status: false, erro: err});
            } else {
                resolve({status: true, 'usuario': usuario});
            }
        });
    });
}
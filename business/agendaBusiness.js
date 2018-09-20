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
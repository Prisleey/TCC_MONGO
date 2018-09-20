let express = require('express');
let router = express.Router();
let AgendaBusiness = require('../business/agendaBusiness');

router.get('/agenda', function(req, res, next) {
    let id_user = req.session.usuarioLogado[0]._id;

    AgendaBusiness.consultarAgendamento(id_user).then(function(agendamentos){
        res.render('agenda', {'agendamentos': agendamentos});
    }).catch(function(erro) {
        res.end(erro);
    });
});

router.post('/agendar', function(req, res, next) {
    console.log('formulario: ', req.body);
    /*let idSala = req.body.idSala;
    let idServico = req.body.id_servico;
    let idUsuario = req.session.usuarioLogado[0]._id;
    let dataAgendamento = req.body.data_agendamento;
    let horarioAgendamento = req.body.horarioAgendamento;
    console.log('horarioAgendamento: ', req.body.horarioAgendamento);

    var resultSplit = horarioAgendamento.split(" - ");

    arrayAgenda = {
        idSala : idSala,
        dataAgendamento : dataAgendamento,
        horario_inicio : resultadoSplit[0],
        horario_fim : resultadoSplit[1],
        idServico : idServico,
        idUsuario : idUsuario
    }

    AgendaBusiness.agendar(json.stringify(arrayAgenda)).then(function(result) {
        res.end(JSON.stringify(result));
    }).catch(function(erro){
        res.end(JSON.stringify(erro));
    });*/
});

module.exports = router;
let express = require('express');
let router = express.Router();
let AgendaBusiness = require('../business/agendaBusiness');

router.get('/agenda', function(req, res, next) {
    let id_user = req.session.usuarioLogado[0]._id;

    AgendaBusiness.consultarAgendamento(id_user).then(function(agendamentos){
        console.log(agendamentos);
        res.render('agenda', {'agendamentos': agendamentos.agendamentos, usuarioLogado: req.session.usuarioLogado});
    }).catch(function(erro) {
        res.end(erro);
    });
});

router.post('/agendar', function(req, res, next) {

    let idSala = req.body.idSala;
    let idServico = req.body.id_servico;
    let idUsuario = req.session.usuarioLogado[0]._id;
    let dataAgendamento = req.body.data_agendamento;
    let horarioAgendamento = req.body.horarioAgendamento;
   // console.log('horarioAgendamento: ', req.body.horarioAgendamento);

    var resultSplit = horarioAgendamento.split(" - ");
    var horario_inicio = resultSplit[0].split(" ");
    var horario_fim = resultSplit[1].split(" ");

    arrayAgenda = {
        idSala: idSala,
        dataAgendamento: dataAgendamento,
        horario_inicio: horario_inicio[0],
        horario_fim: horario_fim[0],
        idServico: idServico,
        idUsuario: idUsuario
    };

    AgendaBusiness.agendar(arrayAgenda).then(function(result) {
        AgendaBusiness.consultarAgendamento(idUsuario).then(function(agendamentos){
            console.log(agendamentos);
            res.render('agenda', {'agendamentos': agendamentos.agendamentos, usuarioLogado: req.session.usuarioLogado});
        })
    }).catch(function(erro){
        res.end(JSON.stringify(erro));
    });
});

module.exports = router;
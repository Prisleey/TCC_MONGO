let express = require('express');
let router = express.Router();
let AgendaBusiness = require('../business/agendaBusiness');
let CarteiraBusiness = require('../business/carteiraBusiness');

router.get('/agenda', function(req, res, next) {
    let id_user = req.session.usuarioLogado[0]._id;

    AgendaBusiness.consultarAgendamento(id_user).then(function(agendamentos){
        res.render('agenda', {usuarioLogado: req.session.usuarioLogado});
    }).catch(function(erro) {
        res.send(erro);
    });
});

router.post('/cancelarAgendamento', function(req, res, next) {
    let id_agendamento = req.body.idAgendamento;

    CarteiraBusiness.estornarComoCredito(id_agendamento).then(function(resultEstorno) {
        AgendaBusiness.cancelarAgendamento(id_agendamento).then(function(result) {
            res.send(result);
        }).catch(function(err) {
            res.send(err);
        });
    });
});

router.post('/updateAgendamento', function(req, res, next) {
    let agendamento = req.body;

    AgendaBusiness.agendamentoUpdate(agendamento).then(function (agendamentoUpdated) {
        res.send(agendamentoUpdated);
    }).catch(function(erro) {

        res.end(erro);
    });
});

router.post('/agendamentos', function(req, res, next) {
    let idTpUser = req.session.usuarioLogado[0].tipo[0].idTpUsuario;
    let id_user = req.session.usuarioLogado[0]._id;

    AgendaBusiness.consultarAgendamentoLookup(id_user).then(function(agendamentos){
        let jsonAgendamentos = [];
        for (var i in agendamentos ) {
            val = agendamentos [i];
            let idAgendamento = val._id;
            let tituloAgendamento = val.sala[0].nomeEstudio + " - " +  val.servico[0].nomeServico;
            let dataAgendamentoFormat = val.dataAgendamento.split("/")[2].trim() + "-" + val.dataAgendamento.split("/")[1].trim() + "-" +  val.dataAgendamento.split("/")[0].trim();
            let startAgendamento = dataAgendamentoFormat + " " + val.horario_inicio + ":00";
            let endAgendamento = dataAgendamentoFormat + " " + val.horario_fim + ":00";
            //let valorAgendamento = val.valorAgendamento.toFixed(2);
            //console.log('VALORRRRRRRRRRRRRRRRRRR> ', valorAgendamento);

            let jsonTemp = {
                id : idAgendamento,
                title : tituloAgendamento,
                description: tituloAgendamento + " <br/>" + val.horario_inicio + " até " + val.horario_fim + " - " +val.valorAgendamento,
                start : startAgendamento,
                end : endAgendamento
            };

            jsonAgendamentos.push(jsonTemp);
        }
        res.send(jsonAgendamentos);
    }).catch(function(erro) {
        res.end(erro);
    });
});

router.post('/agenda', function(req, res, next) {

    let idSala = req.body.idSala;
    let idServico = req.body.id_servico.split(";")[0];
    let idUsuario = req.body.idUsuario;
    let dataAgendamento = req.body.data_agendamento;
    let horarioAgendamento = req.body.horarioAgendamento;
    let valorAgendamento = req.body.valorAgendamento.replace(',','.');

    var resultSplit = horarioAgendamento.split(" - ");
    var horario_inicio = resultSplit[0].split(" ");
    var horario_fim = resultSplit[1].split(" ");

    arrayAgenda = {
        idSala: idSala,
        dataAgendamento: dataAgendamento,
        horario_inicio: horario_inicio[0],
        horario_fim: horario_fim[0],
        idServico: idServico,
        idUsuario: idUsuario,
        valorAgendamento : valorAgendamento
    };

    AgendaBusiness.agendar(arrayAgenda).then(function(result) {
        AgendaBusiness.consultarAgendamento(idUsuario).then(function(agendamentos){
            res.render('agenda', {/*'agendamentos': agendamentos.agendamentos,*/ usuarioLogado: req.session.usuarioLogado});
        })
    }).catch(function(erro){
        res.end(JSON.stringify(erro));
    });
});

module.exports = router;
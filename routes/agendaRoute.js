let express = require('express');
let router = express.Router();
let AgendaBusiness = require('../business/agendaBusiness');

router.get('/agenda', function(req, res, next) {
    let id_user = req.session.usuarioLogado[0]._id;

    AgendaBusiness.consultarAgendamento(id_user).then(function(agendamentos){
        console.log(agendamentos);
        res.render('agenda', {usuarioLogado: req.session.usuarioLogado});
    }).catch(function(erro) {
        res.end(erro);
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
    let id_user = req.session.usuarioLogado[0]._id;

    AgendaBusiness.consultarAgendamentoLookup(id_user).then(function(agendamentos){
        console.log("NOVA AGENDA LOOKUP --------------------");
        console.log(agendamentos);
        //console.log(agendamentos[0].sala[0].nomeEstudio);
        console.log("OPA -------------1");
        let jsonAgendamentos = [];
        for (var i in agendamentos ) {
            val = agendamentos [i];
            console.log(val);
            let idAgendamento = val._id;
            let tituloAgendamento = val.sala[0].nomeEstudio + " - " +  val.servico[0].nomeServico;
            let dataAgendamentoFormat = val.dataAgendamento.split("/")[2].trim() + "-" + val.dataAgendamento.split("/")[1].trim() + "-" +  val.dataAgendamento.split("/")[0].trim();
            let startAgendamento = dataAgendamentoFormat + " " + val.horario_inicio + ":00";
            let endAgendamento = dataAgendamentoFormat + " " + val.horario_fim + ":00";

            let jsonTemp = {
                id : idAgendamento,
                title : tituloAgendamento,
                start : startAgendamento,
                end : endAgendamento
            };

            jsonAgendamentos.push(jsonTemp);
        }
        console.log(jsonAgendamentos);
        console.log("END NOVA AGENDA LOOKUP ----------------");



            /*let agendaEvents = {
                id:,
                title:,
                start:,
                end:
            }*/

        //});

        res.send(jsonAgendamentos);
    }).catch(function(erro) {
        res.end(erro);
    });
});

router.post('/agendar', function(req, res, next) {

    let idSala = req.body.idSala;
    let idServico = req.body.id_servico.split(";")[0];
    let idUsuario = req.body.idUsuario;
    let dataAgendamento = req.body.data_agendamento;
    let horarioAgendamento = req.body.horarioAgendamento;
   // console.log('horarioAgendamento: ', req.body.horarioAgendamento);

    var resultSplit = horarioAgendamento.split(" - ");
    var horario_inicio = resultSplit[0].split(" ");
    var horario_fim = resultSplit[1].split(" ");

    console.log("EEEEEETA PORRA");
    console.log(idSala);
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
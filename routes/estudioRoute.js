var express = require('express');
let EstudioBusiness = require('../business/estudioBusiness');
var router = express.Router();

router.get('/cadastro-estudio', function(req, res, next) {
    res.render('cadastrarEstudio', {usuarioLogado: req.session.usuarioLogado});
});

router.post('/cadastro-estudio', function(req, res, next) {
    let dadosFormEstudio = req.body;
    var horarioFuncionamentoTb = new Array();

    var resultSplit = dadosFormEstudio.horarioFuncionamento.split(" - ");
    var dias = JSON.stringify(dadosFormEstudio.diaSemana).replace('{','').replace('}','').replace('[','').replace(']','');
    horarioFuncionamentoTb = {
        id_estudio : "",
        horario_inicio : resultSplit[0],
        horario_fim : resultSplit[1],
        dias_semana : dias
    };

    delete dadosFormEstudio["horarioFuncionamento"]; //removi de dadosFormEstudio pois horarioFuncionamento não será inserido na mesma tabela
    delete dadosFormEstudio["diaSemana"];//removi de dadosFormEstudio pois diaSemana não será inserido na mesma tabela

    dadosFormEstudio.idUsuario = req.session.usuarioLogado[0]._id;

    EstudioBusiness.salvarEstudio(dadosFormEstudio).then(function(objeto) {
        res.render('index', { tiposUser:{}, usuarioLogado: req.session.usuarioLogado });
    }).catch (function(erro) {
        console.log(erro);
        res.render('index', { tiposUser:{}, usuarioLogado: req.session.usuarioLogado });
    });
});

router.get('/detalhe-estudio', function(req, res, next) {
    let idEstudio = req.query.id_estudio;
console.log('idEstudio ',idEstudio);
    EstudioBusiness.detalheEstudio(idEstudio).then(function(objeto) {

        res.render('detalheEstudio', {estudio: objeto, usuarioLogado: req.session.usuarioLogado});
    }).catch(function(erro) {
        res.end(JSON.stringify(erro));
    });
});

module.exports = router;
var express = require('express');
let EstudioBusiness = require('../business/estudioBusiness');
var router = express.Router();

router.get('/cadastro-estudio', function(req, res, next) {
    res.render('cadastrarEstudio');
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

console.log(dadosFormEstudio);

    // EstudioBusiness.consultarEstudio(dadosFormEstudio).then(function(objeto) {

    // });

    EstudioBusiness.salvarEstudio(dadosFormEstudio).then(function(objeto) {
        res.render('index', { autenticado : true });
    }).catch (function(erro) {
        console.log(erro);
        res.render('index', { autenticado : erro });
    });

    // cadastroEstudioModel.cadastrarEstudio(dadosFormEstudio, function(error, result) {
    //     cadastroEstudioModel.getIdEstudio(dadosFormEstudio, function(error, result) {
    //         horarioFuncionamentoTb.id_estudio = result[0].id_estudio;
    //         cadastroEstudioModel.inserirHorarioEstudio(horarioFuncionamentoTb, function(error, result) {
    //             res.redirect('/cadastro-estudio'); //usar redirect no post, para não ter problema de reenviar formulário
    //         });
    //     });
    // });
});

module.exports = router;